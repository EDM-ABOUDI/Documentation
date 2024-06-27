import { FaFacebook,FaInstagram,FaTiktok} from 'react-icons/fa'
const Footer = () => {
    return (
        <footer className="w-[100%] flex justify-center text-center p-[2rem] bg-[var(--bg-main-color)]">
            <div className="w-auto flex flex-col gap-[1rem] text-[var(--main-color)]">
                <h1 className="text-[2rem] fw-bold">
                    Alaa Hotait
                </h1>
                <h1>
                    Lebanon,Janoub
                </h1>
                <div className="flex">
                    <a className="underline" href="tel:+96181431505">
                        +96181431505
                    </a>
                    <span>&nbsp;|&nbsp;</span>
                    <a className="underline" href="mailto:alaahotait@gmail.com">
                        alaahotait@gmail.com
                    </a>
                </div>
                <div className="flex justify-center gap-[0.5rem]">
                    <a href="https://www.facebook.com/alaahotait_">
                        <FaFacebook className="text-[1rem]" />
                    </a>
                    <a href="https://www.instagram.com/alaahotait_/">
                        <FaInstagram className="text-[1rem]" />
                    </a>
                    <a href="https://www.tiktok.com/@alaahotait_?_t=8dR5AK6PKyI&_r=1">
                        <FaTiktok className="text-[1rem]" />
                    </a>
                </div>
                <hr className="my-[1rem]"></hr>
                <div>
                    &copy; 2023 All Right Reserved
                </div>
            </div>
        </footer>
    )
}

export default Footer