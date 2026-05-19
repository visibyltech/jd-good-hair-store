Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('c:\Users\Hassan\Desktop\gdhair\z ref\hero-banner-DJPxQuQ6.jpg')
$width = $img.Width
$height = $img.Height
$img.Dispose()

$gen = [System.Drawing.Image]::FromFile('c:\Users\Hassan\Desktop\gdhair\z ref\hero_banner_no_text.png')
$bmp = New-Object System.Drawing.Bitmap($gen, $width, $height)
$bmp.Save('c:\Users\Hassan\Desktop\gdhair\z ref\hero_banner_no_text_resized.png', [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$gen.Dispose()
Write-Host "Original Dimensions: $width x $height"
Write-Host "Resized successfully!"
