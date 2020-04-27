var gulp = require('gulp');

let dest = "./src/html/libs";
let bootstrap_dest = "./src/html/libs/bootstrap";
let jquery_dest = "./src/html/libs/jquery";
let popper_dest = "./src/html/libs/popper";


let targets = [];
//bootstrap
targets.push(["./node_modules/bootstrap/dist/**/*",bootstrap_dest])
//targets.push(["./node_modules/bootstrap/dist/css/bootstrap-grid.css",bootstrap_dest]);
//targets.push(["./node_modules/bootstrap/dist/css/bootstrap-grid.min.css",bootstrap_dest]);
//targets.push(["./node_modules/bootstrap/dist/css/bootstrap-reboot.css",bootstrap_dest]);
//targets.push(["./node_modules/bootstrap/dist/css/bootstrap-reboot.min.css",bootstrap_dest]);
//targets.push(["./node_modules/bootstrap/dist/css/bootstrap.css",bootstrap_dest]);
//targets.push(["./node_modules/bootstrap/dist/css/bootstrap.min.css",bootstrap_dest]);

//jquery
targets.push(["./node_modules/jquery/dist/**/*",jquery_dest]);
//targets.push(["./node_modules/jquery/dist/jquery.js",jquery_dest]);
//targets.push(["./node_modules/jquery/dist/jquery.min.js",jquery_dest]);

//popper
targets.push(["./node_modules/popper.js/dist/**/*",popper_dest]);
//targets.push(["./node_modules/popper.js/dist/popper-utils.js",popper_dest]);
//targets.push(["./node_modules/popper.js/dist/popper-utils.min.js",popper_dest]);
//targets.push(["./node_modules/popper.js/dist/popper.js",popper_dest]);
//targets.push(["./node_modules/popper.js/dist/popper.min.js",popper_dest]);

gulp.task('default', async function () {
    targets.forEach(target => {
        gulp.src([target[0]]).pipe(gulp.dest(target[1]))
    });
});