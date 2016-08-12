module Simple2DEngine.Input {

    export class InputManager {

        private engine : Simple2DEngine;

        private inputTouch : Input.InputTouch;
        private inputMouse : Input.InputMouse;

        public get pointerDown() : boolean {
            return this.inputMouse.isDown || this.inputTouch.touches.length > 0;
        }

        public get pointerX() : number {
            if (this.inputMouse.isDown)
                return this.inputMouse.x;

            if (this.inputTouch.touches.length > 0)
                return this.inputTouch.touches[0].x;

            return 0;
        }

        public get pointerY() : number {
            if (this.inputMouse.isDown)
                return this.inputMouse.y;

            if (this.inputTouch.touches.length > 0)
                return this.inputTouch.touches[0].y;

            return 0;
        }

        constructor(engine : Simple2DEngine) {
            this.engine = engine;

            this.inputTouch = new Input.InputTouch(engine);
            this.inputMouse = new Input.InputMouse(engine);
        }

        public update() : void {
            //Nothing to do..
        }
    }
}