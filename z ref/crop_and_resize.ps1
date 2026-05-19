Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('c:\Users\Hassan\Desktop\gdhair\z ref\hero-banner-DJPxQuQ6.jpg')
$targetWidth = $img.Width
$targetHeight = $img.Height
$img.Dispose()

$gen = [System.Drawing.Image]::FromFile('c:\Users\Hassan\Desktop\gdhair\z ref\hero_banner_no_text.png')
$genWidth = $gen.Width
$genHeight = $gen.Height

# Calculate aspect ratios
$targetRatio = $targetWidth / $targetHeight
$genRatio = $genWidth / $genHeight

if ($genRatio -gt $targetRatio) {
    # Gen is wider than target. Crop width.
    $cropHeight = $genHeight
    $cropWidth = [int]($genHeight * $targetRatio)
} else {
    # Gen is taller than target. Crop height.
    $cropWidth = $genWidth
    $cropHeight = [int]($genWidth / $targetRatio)
}

$cropX = [int](($genWidth - $cropWidth) / 2)
$cropY = [int](($genHeight - $cropHeight) / 2)

$cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropWidth, $cropHeight)
$croppedBmp = New-Object System.Drawing.Bitmap($cropWidth, $cropHeight)
$graphics = [System.Drawing.Graphics]::FromImage($croppedBmp)
$graphics.DrawImage($gen, 0, 0, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
$graphics.Dispose()

$finalBmp = New-Object System.Drawing.Bitmap($croppedBmp, $targetWidth, $targetHeight)
$finalBmp.Save('c:\Users\Hassan\Desktop\gdhair\z ref\hero_banner_no_text_resized.png', [System.Drawing.Imaging.ImageFormat]::Png)

$finalBmp.Dispose()
$croppedBmp.Dispose()
$gen.Dispose()

Write-Host "Cropped to $cropWidth x $cropHeight and resized to $targetWidth x $targetHeight to avoid stretching."
