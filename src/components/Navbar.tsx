import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "../styles/topbar.css";

import TopMenu from "./topmenu";
const Navbar = async () => {
	const session = await getServerSession(authOptions);


	return (

		<section>
			{session?.user ? (
				<TopMenu></TopMenu>
			) : (
				<nav className="hidden">

				</nav>
			)}
		</section>
	);
};

export default Navbar;

