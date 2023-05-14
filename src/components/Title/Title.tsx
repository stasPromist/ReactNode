import './Title.css';


interface Props {
    main: string;
    sub: string;
}

function Title({ main, sub }: Props) {
    return (
        <>
            <div className="text-center mt-5 pt-5 color">
                <h1>{main}</h1>
                <h5>{sub}</h5>
            </div>
        </>
    );
}

export default Title;