/*
 * @Author: pao
 * @Date:   2016-11-26 22:43:17
 * @Last Modified by:   pao
 * @Last Modified time: 2017-01-13 13:24:52
 */

'use strict';
! function(w) {
    var Clock = function(options) {
        this.ctx = options.ctx;
        this.r = options.r;
        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height / 2;
    };
    Clock.prototype = {
        constructor: Clock,
        toRadian: function(angle) {
            return angle * Math.PI / 180
        },
        drawClockArc: function() {
            var ctx = this.ctx;
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
            ctx.beginPath();
        },
        drawClockScale: function() {
            var ctx = this.ctx;
            var startAngle = 0,
                step = 6,
                lineL,
                i = 0
            for (; i < 60; i++) {
                ctx.save();
                lineL = 8;
                ctx.strokeStyle = '#fff';
                if (startAngle % 30 === 0) {
                    ctx.lineWidth = 4;
                    lineL = 12;
                }
                ctx.moveTo(this.x + Math.sin(this.toRadian(startAngle)) * this.r, this.y - Math.cos(this.toRadian(startAngle)) * this.r);

                ctx.lineTo(this.x + Math.sin(this.toRadian(startAngle)) * this.r - Math.sin(this.toRadian(startAngle)) * lineL, this.y - Math.cos(this.toRadian(startAngle)) * this.r + Math.cos(this.toRadian(startAngle)) * lineL);

                startAngle += step;
                ctx.stroke();
                ctx.restore();
                ctx.beginPath();
            }
        },
        drawTime: function() {
            var date = new Date();
            var second = date.getSeconds();
            var minute = date.getMinutes();
            var hour = date.getHours();
            var secondAngle = second * 6;
            var minuteAngle = minute * 6 + second / 60 * 6;
            var hourAngle = hour % 12 * 30 + minute / 60 * 30 + second / 3600 * 30;
            var ctx = this.ctx;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            this.drawClockArc();
            this.drawClockScale();
            ctx.save();
            ctx.translate(this.x, this.y);
            this.drawSecondHand(secondAngle);
            this.drawMinuteHand(minuteAngle);
            this.drawHourHand(hourAngle);
            ctx.restore();
        },
        drawSecondHand: function(angle) {
            var ctx = this.ctx;
            ctx.beginPath();
            ctx.save();
            ctx.strokeStyle = 'red';
            // ctx.translate(this.x, this.y);
            ctx.rotate(this.toRadian(angle));
            ctx.moveTo(0, 20);
            ctx.lineTo(0, -this.r + 20);
            ctx.stroke();
            ctx.restore();
        },
        drawMinuteHand: function(angle) {
            var ctx = this.ctx;
            ctx.beginPath();
            ctx.save();
            ctx.strokeStyle = '#fff';
            // ctx.translate(this.x, this.y);
            ctx.rotate(this.toRadian(angle));
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -this.r + 20);
            ctx.stroke();
            ctx.restore();
        },
        drawHourHand: function(angle) {
            var ctx = this.ctx;
            ctx.beginPath();
            ctx.save();
            ctx.strokeStyle = '#fff';
            // ctx.translate(this.x, this.y);
            ctx.rotate(this.toRadian(angle));
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -this.r + 40);
            ctx.stroke();
            ctx.restore();
        },
        running: function() {
            var _this = this;
            ! function draw() {
                _this.drawTime();
                window.requestAnimationFrame(draw);
            }()
        }
    }

    w.Clock = Clock;
}(window);
