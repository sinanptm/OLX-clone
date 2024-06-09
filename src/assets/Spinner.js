import { BeatLoader } from "react-spinners";


const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
};


export const Spinner = () => {
    return (
        <div style={spinnerStyle}>
            <BeatLoader size={15} color={"#123abc"} />
        </div>
    );
}