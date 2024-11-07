import os
import re
from googletrans import Translator
import yaml
import toml

# Initialize the Google Translator
translator = Translator()

# Function to translate content from a given string
def translate_text(text, target_language):
    if not text or isinstance(text, str) and not text.strip():
        return text  # Return the original text if it's empty or None

    try:
        # Translate text
        translated = translator.translate(text, dest=target_language)
        return translated.text  # Return the translated text
    except Exception as e:
        print(f"Error translating text: {e}")
        return text  # Return the original text if translation fails

# Function to process YAML files (and preserve structure)
def translate_yaml(content, target_language):
    parsed_yaml = yaml.safe_load(content)  # Parse YAML content
    for key, value in parsed_yaml.items():
        if isinstance(value, str):
            parsed_yaml[key] = translate_text(value, target_language)  # Translate the string values
        elif isinstance(value, dict):
            parsed_yaml[key] = translate_yaml(value, target_language)  # Recursively translate nested dictionaries
    return yaml.dump(parsed_yaml, allow_unicode=True)

# Function to process TOML files
def translate_toml(content, target_language):
    parsed_toml = toml.loads(content)  # Parse TOML content
    for key, value in parsed_toml.items():
        if isinstance(value, str):
            parsed_toml[key] = translate_text(value, target_language)  # Translate the string values
        elif isinstance(value, dict):
            parsed_toml[key] = translate_toml(value, target_language)  # Recursively translate nested sections
    return toml.dumps(parsed_toml)

# Function to process Markdown files
def translate_markdown(content, target_language):
    # Extract text in Markdown (skip code blocks, images, etc.)
    text = re.sub(r'(```.*?```)', '', content, flags=re.DOTALL)  # Remove code blocks
    text = re.sub(r'!\[.*?\]\(.*?\)', '', text)  # Remove images
    text = re.sub(r'\[.*?\]\(.*?\)', '', text)  # Remove links

    # Translate the text
    translated_text = translate_text(text, target_language)

    # Rebuild the markdown with translated text
    return translated_text

# Main function to traverse directories and process files
def process_files(src_dir, target_language, dest_dir):
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            file_path = os.path.join(root, file)
            # Get the relative path from src_dir
            relative_path = os.path.relpath(file_path, src_dir)
            # Create corresponding path in the destination language folder
            dest_file_path = os.path.join(dest_dir, relative_path)
            dest_dir_path = os.path.dirname(dest_file_path)

            # Ensure the target directory exists
            if not os.path.exists(dest_dir_path):
                os.makedirs(dest_dir_path)

            # Handle Markdown files (without extension)
            if file.endswith('.md') and not file.endswith('.en.md'):
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                translated_content = translate_markdown(content, target_language)

                # Save translated content with the same file name but in the target language folder
                translated_file_path = dest_file_path.replace('.md', f'.md')
                with open(translated_file_path, 'w', encoding='utf-8') as f:
                    f.write(translated_content)
                print(f'Translated: {file_path} -> {translated_file_path}')

            # Handle YAML files
            elif file.endswith('.yaml'):
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                translated_content = translate_yaml(content, target_language)
                translated_file_path = dest_file_path.replace('.yaml', f'.{target_language}.yaml')
                with open(translated_file_path, 'w', encoding='utf-8') as f:
                    f.write(translated_content)
                print(f'Translated: {file_path} -> {translated_file_path}')

            # Handle TOML files
            elif file.endswith('.toml'):
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                translated_content = translate_toml(content, target_language)
                translated_file_path = dest_file_path.replace('.toml', f'.{target_language}.toml')
                with open(translated_file_path, 'w', encoding='utf-8') as f:
                    f.write(translated_content)
                print(f'Translated: {file_path} -> {translated_file_path}')

# Main entry point
if __name__ == '__main__':
    # Directory to process (source content)
    src_dir = 'content.en'  # The path to your content.en directory

    # Target language (e.g., 'fr' for French, 'ja' for Japanese)
    target_language = 'ja'  # You can change this to 'ja', 'de', etc.

    # Destination directory for translated content (e.g., content.fr)
    dest_dir = f'content.{target_language}'

    # Process the files
    process_files(src_dir, target_language, dest_dir)
