namespace engine {
    export let run = (canvas: HTMLCanvasElement) => {

        var stage = engine.Stage.getInstance();
        stage.setWidth(canvas.width);
        stage.setHeight(canvas.height);
        let context2D = canvas.getContext("2d");
        var currentTarget;                      //鼠标点击时当前的对象
        var startTarget;                        //mouseDown时的对象
        var isMouseDown = false;
        var startPoint = new Point(-1,-1);
        var movingPoint = new Point(0,0);
        let lastNow = Date.now();
        let frameHandler = () => {
            let now = Date.now();
            let deltaTime = now - lastNow;
            Ticker.getInstance().notify(deltaTime);
            context2D.clearRect(0, 0, 400, 400);
            context2D.save();
            stage.draw(context2D);
            context2D.restore();
            lastNow = now;
            window.requestAnimationFrame(frameHandler);
        }

        window.requestAnimationFrame(frameHandler);

        window.onmousedown = (e) =>{
        let x = e.offsetX - 3;
        let y = e.offsetY - 3;
        TouchEventService.stageX = x;
        TouchEventService.stageY = y;
        Stage.stageX = TouchEventService.stageX;
        Stage.stageY = TouchEventService.stageY;
        startPoint.x = x;
        startPoint.y = y;
        movingPoint.x = x;
        movingPoint.y = y;
        TouchEventService.currentType = TouchEventsType.MOUSEDOWN;
        currentTarget = stage.hitTest(x,y);
        startTarget = currentTarget;
        TouchEventService.getInstance().toDo();
        isMouseDown = true;
    }

    window.onmouseup = (e) =>{
        let x = e.offsetX - 3;
        let y = e.offsetY - 3;
        TouchEventService.stageX = x;
        TouchEventService.stageY = y;
        Stage.stageX = TouchEventService.stageX;
        Stage.stageY = TouchEventService.stageY;
        var target = stage.hitTest(x,y);
        if(target == currentTarget){
            TouchEventService.currentType = TouchEventsType.CLICK;
        }
        else{
            TouchEventService.currentType = TouchEventsType.MOUSEUP
        }
        TouchEventService.getInstance().toDo();
        currentTarget = null;
        isMouseDown = false;
    }

    window.onmousemove = (e) =>{
        if(isMouseDown){
            let x = e.offsetX - 3;
            let y = e.offsetY - 3;
            TouchEventService.stageX = x;
            TouchEventService.stageY = y;
            Stage.stageX = TouchEventService.stageX;
            Stage.stageY = TouchEventService.stageY;
            TouchEventService.currentType = TouchEventsType.MOUSEMOVE;
            currentTarget = stage.hitTest(x,y);
            TouchEventService.getInstance().toDo();
            movingPoint.x = x;
            movingPoint.y = y;

        }
    }

        return stage;

    }



}
