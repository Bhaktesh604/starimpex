"use client"
import Image from "next/image";
import userProfileIcon from '@/public/assets/images/ic-user-profile.svg'
import { userDetails } from "@/utils/userProfile.util";
import { useEffect, useState } from "react";
import { getUserProfileApi } from "../api/user.api";
import { TOKEN_KEY, USER_TYPE_KEY, } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { links } from "@/utils/links";
import { EUserType } from "@/interfaces/common.interface";
import { ResponseCodes } from "@/interfaces/response.interface";
import { toast } from "react-toastify";
import { ResponseMessages } from "@/utils/response.messages";

export default function Page(){
    const [user, setUser] = useState<any>({});
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      (async () => {
        try {
            if(!localStorage.getItem(TOKEN_KEY) || localStorage.getItem(USER_TYPE_KEY)!==EUserType.USER){
                router.push(links.LOGIN);
                return;
            }
            const resp = await getUserProfileApi();
            setIsLoading(false);
            if(resp && resp.responseCode === ResponseCodes.SUCCESS){
                setUser(resp.data);
                return;
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(ResponseMessages.SOMETHING_WENT_WRONG);
        }
      })();
    }, [router])
    

    return (
        <div className="bg-white rounded-lg m-7 py-4 px-6 mt-[9rem] md:mt-[6rem]">
            <h3 className="font-medium">Profile</h3>
            <div className="grid gap-2 place-items-center my-5">
                <div className="rounded-full border border-tertiary flex justify-center items-center bg-dashboard_primary">
                    <Image src={userProfileIcon} alt="user profile" className="w-12 h-12 m-3 object-contain" />
                </div> 
                {isLoading ? <div className="animate-pulse w-20 h-4 bg-gray-300 rounded-sm"/> : <p className="text-base font-medium">{user ? user.fullName : ''}</p>}
                <button className="btn btn-tertiary !rounded-md disabled:bg-tertiary/50 hidden" disabled={true}>Edit Profile</button>
            </div>
            <h5 className="font-medium">Details</h5>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8 my-3">
                {userDetails.map(detail => <div className="flex items-center gap-3 bg-dashboard_primary px-6 py-4 rounded-md" key={detail.key}>
                    <div>
                        <Image src={detail.icon} alt="icon" className="w-6 h-6 object-contain" />
                    </div>
                    <div className="w-full">
                        <p className="font-medium">{detail.title}</p>
                        {isLoading ? <div className="animate-pulse w-full h-4 bg-gray-300 rounded-sm"/> : <p className="text-xs break-all">{user ? user[detail.key] || '-' : '-'}</p>}
                    </div>
                </div>)}
            </div>
        </div>
    )
}