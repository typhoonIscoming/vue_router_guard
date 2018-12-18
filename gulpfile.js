const path = require('path')
const gulp = require('gulp')
const spritesmith = require('gulp.spritesmith')

const fs = require('fs')
const mkdirp = require('mkdirp')
const rmfr= require('rmfr')

// 待处理的图片目录
const ICON_SOURCE = path.resolve(__dirname, 'src/assets')

// 生成的sprite图片目录
const SPRITE_SOURCE = path.resolve(__dirname, 'src/img/sprites')

//生成的scss文件目录
const SPRITE_SCSS = path.resolve(__dirname, 'src/theme/sprites')


// 判断是否有存放sprite图片的目录
if(!fs.existsSync(SPRITE_SOURCE)) {
    mkdirp.sync(SPRITE_SOURCE)
}

// 判断是否存在scss目录
if(!fs.existsSync(SPRITE_SCSS)) {
    mkdirp.sync(SPRITE_SCSS)
}

gulp.task('sprite', function(){
    readSource(ICON_SOURCE)
    function readSource(dirname) { // 传需要转换的图片的路径
        const file = fs.readdirSync(dirname) // 获取到的所有的图片
        const pngs = file.filter(file => /\.png/.test(file)) // 拿到所有图片中的png图片
        if(pngs.length >=1) {
            // 获取当前文件相对于ICON_SOURCE的路径
            const relativePath = path.relative(ICON_SOURCE, dirname)
            const spriteDest = path.resolve(SPRITE_SOURCE, relativePath)
            // scss文件中引用的sprite图片地址
            const scssImgDest = path.relative(__dirname, spriteDest).replace(/src\//g, '~@')
			console.log(scssImgDest)
            // scss文件存放的地址
            const scssDest = path.resolve(SPRITE_SCSS, relativePath)

            gulp.src(`${dirname}/*.png`).pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                padding: 6,
                imgPath: `${scssImgDest}/sprite.png`,
                cssTemplate: 'gulp_templates/scss.2x.template.handlebars',
//				cssTemplate: (data) => {
//					// data 是合并完成的信息
//					let merge = [],
//						width = data.spritesheet.px.width,
//						height = data.spritesheet.px.height,
//						imageUrl =  data.spritesheet.image;
//					data.sprites.forEach((sprite) => {
//						merge.push(
//                      '.' + sprite.name+
//                      "{\n"+
//                          "background: url('"+imageUrl+"') "+
//                          "no-repeat "+
//                          Number(sprite.px.offset_x.replace('px', '')) / 2 + "px"+" "+ Number(sprite.px.offset_y.replace('px', '') / 2) + "px"+";\n"+
//                          "background-size: "+ Number(width.replace('px', '')) / 2 + "px"+" "+Number(height.replace('px', '')) / 2 + "px"+";\n"+
//                          "width: "+Math.floor(Number(sprite.px.width.replace('px', '')) / 2) + "px"+";\n"+                       
//                          "height: "+Math.floor(Number(sprite.px.height.replace('px', '')))+ "px"+";\n"+
//                      "}\n"
//                  )
//					})
//					return merge.join('')
//				},
            }))
            .pipe(gulp.dest(spriteDest))
            .on('finish', () => {
                const temSrc = path.join(spriteDest, 'sprite.scss')
                const tempDst = path.join(scssDest, 'sprite.scss')
                if(!fs.existsSync(scssDest)){
                    mkdirp.sync(scssDest)
                }

                fs.renameSync(temSrc, tempDst)
            })
        }

        file.forEach(function(ele){
            const curPath = `${dirname}/${ele}`
            const info = fs.statSync(curPath)
            if(info.isDirectory()){
                return readdirSync(curPath)
            }
        })
    }
})

gulp.task('clearSprite', function(){
    rmfr(SPRITE_SOURCE)
    rmfr(SPRITE_SCSS)
})


