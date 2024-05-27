'use client'

import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const UserAccountnav = () => {
    return <img src="/assets/logout.png" alt="Perfil" onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`
    })} />
};

export default UserAccountnav;