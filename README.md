# Piggy Botanist's Github Page

This is the source code for my github page at [https://piggybotanist.github.io/](https://piggybotanist.github.io/). This website is where I post educational content in the field of biology and computer science. The target audience is for people that knows little about biology, computer science, and bioinformatics. However, higher level content for research are also explored. 

Note: This page is built using [Hugo](#https://gohugo.io/) with their template, and all content are written in markdown format

## About setting up hugo on github (for myself):

1. **Install Hugo**: Ensure you have Hugo installed on your machine. You can download it from [Hugo's official website](https://gohugo.io/getting-started/quick-start/).

2. **Add Environmental Variable**:
   - For Windows: Search for "Environment Variables" in the Start menu.
   - Click on "Environment Variables" under the "Advanced" tab.
   - Add a new system variable named `HUGO_HOME` pointing to your Hugo installation path (e.g., `C:\Program Files\Hugo\bin`).
   - Add this path to the `Path` variable as well, so you can run Hugo from any command prompt.

3. **Test Hugo Executable**: Open your terminal and run:
   ```bash
   hugo --version
   
4. **Set Up the Package**:
   - Navigate to the folder where you want to create your Hugo project, or create a new folder.
   - Use the following command to initialize a new Hugo site:
     ```bash
     hugo new site <folder-name>
     ```
   - If the folder already exists, add `--force` to overwrite it:
     ```bash
     hugo new site <folder-name> --force
     ```

5. **Add a Theme**:
   - After setting up the site, you can either download a theme package from the [Hugo Themes website](https://themes.gohugo.io/) or create your own theme.
   - If you downloaded a theme, move the theme folder into the `themes` directory of your Hugo site.
   - Update the `config.toml` file to specify your theme:
     ```toml
     theme = "<theme-name>"
     ```

6. **Create Content**:
   - Once your theme is set up, you can start adding content.
   - Content should be written in Markdown format (.md). If you have any questions about Markdown syntax, check out the [Markdown Guide](https://www.markdownguide.org).
   - Use the following command to create a new Markdown file:
     ```bash
     hugo new <section>/<filename>.md
     ```
     Replace `<section>` with the content type (e.g., `posts` or `pages`) and `<filename>` with your desired file name.

7. **Run Your Site Locally**:
   - To preview your site, navigate to your Hugo project folder and run:
     ```bash
     hugo server
     ```
   - Your site will be available at `http://localhost:1313`. Open this URL in your web browser to see your changes in real-time.

8. **Deploy Your Site**:
   - Once you're satisfied with your site, you can deploy it to GitHub Pages or any other hosting service.
   - Please follow the content from hugo to do this: [here](#https://gohugo.io/hosting-and-deployment/hosting-on-github/)
   - Once complete you will be able to view your github website using <your_username>.github.io

