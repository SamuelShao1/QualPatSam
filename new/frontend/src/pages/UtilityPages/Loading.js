import CircleLoader from '../../components/common/CircleLoad';
const Loading = () => {
    return (
        <div className="w-full h-full flex mt-[5rem] justify-center">
            <div className="flex-col">
                <p className="block text-center text-5xl">Parsing data</p>
                <CircleLoader meshColor={"#109ab3"}
                    lightColor={"#109ab3"}
                    duration={1.5}
                    desktopSize={"100vh"}
                    mobileSize={"100vh"} 
                />
            </div>
        </div>
    );
}

export default Loading;