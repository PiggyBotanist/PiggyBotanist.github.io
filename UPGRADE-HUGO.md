# Upgrade Hugo on Windows (for PaperMod compatibility)

PaperMod requires **Hugo Extended v0.146.0 or greater**. Your current version is 0.136.5.

## Option 1: Chocolatey (recommended if you use it)

```powershell
choco upgrade hugo-extended -y
```

If Hugo isn’t installed via Chocolatey yet:

```powershell
choco install hugo-extended -y
```

## Option 2: Scoop

```powershell
scoop update hugo-extended
```

If not installed:

```powershell
scoop install hugo-extended
```

## Option 3: Manual download

1. Open: **https://github.com/gohugoio/hugo/releases**
2. Download **hugo_extended_0.146.x_windows-amd64.zip** (latest 0.146.x).
3. Unzip and replace your existing `hugo.exe` with the one from the zip (or add the folder to your PATH if it’s new).
4. Confirm in a new terminal:

   ```powershell
   hugo version
   ```

   You should see something like `hugo v0.146.x` or higher.

## Option 4: PowerShell one-liner (download and extract)

Run in PowerShell (replace `$InstallDir` if you want a different folder):

```powershell
$InstallDir = "C:\Hugo\bin"   # or where your hugo.exe lives
$Version = "0.146.6"
$Zip = "$env:TEMP\hugo_extended_${Version}_windows-amd64.zip"
$Url = "https://github.com/gohugoio/hugo/releases/download/v$Version/hugo_extended_${Version}_windows-amd64.zip"
Invoke-WebRequest -Uri $Url -OutFile $Zip -UseBasicParsing
Expand-Archive -Path $Zip -DestinationPath $env:TEMP\hugo -Force
New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
Copy-Item "$env:TEMP\hugo\hugo.exe" -Destination $InstallDir -Force
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
hugo version
```

After upgrading, run again:

```powershell
hugo server -D
```
