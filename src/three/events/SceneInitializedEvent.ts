import Loop from '@/three/core/Loop';

export default class SceneInitializedEvent extends Event {

    static EVENT_NAME = 'scene-initialized';

    constructor(
        private readonly loop: Loop
    ) {
        super(SceneInitializedEvent.EVENT_NAME);
    }

    public getLoop(): Loop {
        return this.loop;
    }
}