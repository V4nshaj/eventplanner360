import Link from "next/link"
import Image from "next/image"

const Footer = () => {
    return (
        <footer className="border-t">
            <div className="flex-center wrapper sm:flex-row flex-between flex-col justify-between items-center gap-4 p-5">
                <Link href="/">
                    <Image
                        src='/assets/images/logo.svg'
                        alt="logo"
                        width={128}
                        height={38}
                    />
                </Link>
                <p>2023 EventPlanner360. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer