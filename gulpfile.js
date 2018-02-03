/**
 * Created by Cober on 2016/12/12.
 */
var gulp = require('gulp');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
    var spriteData = gulp.src('app/images/sprite/*.png').pipe(spritesmith({
        imgName: 'sprite2.png',
        imgPath: '../images/sprite2.png',
        cssName: 'sprite2.css',
        cssOpts: {
            cssSelector: function (item) {
                var name = (item.name || '').toLowerCase();
                name = name.replace('-hover', ':hover');
                name = name.replace('-checked',':checked');
                return '.sprite-' + name;
            }
        }
    }));

    var imgStream = spriteData.img
        .pipe(gulp.dest('src/static/images/'));

    var cssStream = spriteData.css
        .pipe(gulp.dest('src/static/styles/'));

    return merge(imgStream, cssStream);
});

// gulp.task('sprite', function () {
//     var spriteData = gulp.src('src/static/images/sprite/*.png').pipe(spritesmith({
//         imgName: 'sprite.png',
//         imgPath: '../images/sprite.png',
//         cssName: 'sprite.css',
//         retinaSrcFilter: '**/*@2x.png',
//         retinaImgName: 'sprite@2x.png',
//         retinaImgPath: '../images/sprite@2x.png',
//         cssOpts: {
//             cssSelector: function (item) {
//                 var name = (item.name || '').toLowerCase();
//                 name = name.replace('-hover', ':hover');
//                 name = name.replace('-checked',':checked');
//                 return '.sprite-' + name;
//             }
//         }
//     }));
//
//     var imgStream = spriteData.img
//         .pipe(gulp.dest('src/static/images/'));
//
//     var cssStream = spriteData.css
//         .pipe(gulp.dest('src/static/styles/'));
//
//     return merge(imgStream, cssStream);
// });

