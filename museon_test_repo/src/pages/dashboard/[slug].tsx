import AddComment from "@/components/AddComment";
import Messages from "@/components/Messages";
import { useRouter } from "next/router";

export interface ISlugMuseoProps { }

export default function GetMuseos(props: ISlugMuseoProps) {

    const router = useRouter()

    const { slug } = router.query
    //const museoId = slug!.toString()
    console.log(slug, router.query)


    return (
        <>
            <AddComment museoId={""} />
        </>
    )
}