'use client'
import SceneContainer from '@/components/SceneContainer';

export default function Fantasy() {
    const annotations = (
        <>
            <div
                id="annotation-1"
                className={'annotation'}
            >
                Annotations can be clicked and will move the camera to the annotated object.

                <br />
                <br />

                If configured, the annotation will also display a text.
            </div>
            <div
                id="annotation-2"
                className={'annotation'}
            >

                Annotations can contain interactive components.

                <br/>
                <br/>

                <button onClick={() => alert('Hello, World!')}>Click 😄</button></div>
            <div
                id="annotation-3"
                className={'annotation'}
            >
                They can also be styled individually, since they simply are HTML elements.
            </div>
        </>
    );

    return (
        <div>
            <SceneContainer
                name={'FantasyDescriptor'}
                children={annotations}
            />
        </div>
    )
}