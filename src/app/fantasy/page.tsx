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
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
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