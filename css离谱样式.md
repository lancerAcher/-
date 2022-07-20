### 矩形四个角

```css

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>

    .map_company{
    width: 100%;
    height: calc(100% - 120px);
    border: 0px solid rgb(60,255,253);
    box-shadow: 0px 0px 15px 5px rgb(60,255,253, 0.4) inset;
    background: linear-gradient(to left, rgb(60,255,253), rgb(60,255,253)) left top no-repeat,
        linear-gradient(to bottom, rgb(60,255,253), rgb(60,255,253)) left top no-repeat,
        linear-gradient(to left, rgb(60,255,253), rgb(60,255,253)) right top no-repeat,
        linear-gradient(to bottom, rgb(60,255,253), rgb(60,255,253)) right top no-repeat,
        linear-gradient(to left, rgb(60,255,253), rgb(60,255,253)) left bottom no-repeat,
        linear-gradient(to bottom, rgb(60,255,253), rgb(60,255,253)) left bottom no-repeat,
        linear-gradient(to left, rgb(60,255,253), rgb(60,255,253)) right bottom no-repeat,
        linear-gradient(to left, rgb(60,255,253), rgb(60,255,253)) right bottom no-repeat;
    background-size: 3px 30px, 30px 3px, 3px 30px, 30px 3px;
    margin-top: 20px;
}

</style>
<body>
    <div style="width: 500px;height: 800px;">
        <div class="map_company"></div>
    </div>
</body>
</html>
```

### 遮罩层

```css
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.8);
}
```

