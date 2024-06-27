const About = () => {

    const skills = [
        {
            caption: 'Media',
            perc: '80%',
            width: 'w-[80%]'
        },
        {
            caption: 'Acting',
            perc: '90%',
            width: 'w-[90%]'
        },
        {
            caption: 'Modeling',
            perc: '75%',
            width: 'w-[75%]'
        },
        {
            caption: 'Marketing',
            perc: '95%',
            width: 'w-[95%]'
        }
    ]

        return (
            <section id="about" className="w-[100%] px-[2rem] py-[6rem] md:p-[6rem] grid items-center grid-cols-1 lg:grid-cols-2">
                <div>
                    <img className="w-[100%]" src="/images/aboutimage.png" alt="My About Img" />
                </div>
                <div className="w-[100%] lg:p-[1rem] mt-[2rem] lg:mt-0">
                    <article className="flex flex-col gap-[1rem]">
                        <div className="flex gap-[0.5rem] items-center">
                            <div className="h-[4px] w-[12px] bg-[var(--main-color)] rounded-[12px]"></div>
                            <h1 className="text-[1rem] fw-bold">ABOUT ME</h1>
                            <div className="h-[4px] w-[24px] bg-[var(--main-color)] rounded-[12px]"></div>
                        </div>
                        <div>
                            <h1 className="1rem leading-[1.5rem] tracking-wider">
                                Allow me to introduce Alaa Hotait, an inspiring 18-year-old residing in the beautiful country of Lebanon. Alaa is currently pursuing a Media major at university, where she delves into the captivating world of communication and content creation.
                                <br></br>
                                Outside of her academic pursuits, Alaa is a prominent figure in the world of TikTok and social media. Through her engaging videos, she captivates her audience by sharing glimpses of her life, unique perspectives, and inspiring stories. Her creativity knows no bounds as she continues to experiment with different formats and trends, leaving her viewers wanting more.
                            </h1>
                        </div>
                    </article>
                    <div className="mt-[2rem]">
                        {
                            skills.map((e, i) => (
                                <div key={i} className="mt-[0.5rem]">
                                    <div className="text-[1rem] text-[var(--main-color)] flex justify-between fw-bold">
                                        <p>{e.caption}</p>
                                        <p>{e.perc}</p>
                                    </div>
                                    <div className="w-[100%] bg-[rgba(0,0,0,0.2)] mt-[0.25rem] rounded-[15px]">
                                        <div className={`h-[10px] ${e.width} bg-[rgb(20,20,20)] rounded-[15px]`}></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        )
}

export default About
