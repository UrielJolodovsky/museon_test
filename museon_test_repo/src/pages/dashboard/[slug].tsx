import AddComment from "@/components/AddComment";
import Messages from "@/components/Messages";

export interface ISlugMuseoProps { }

export default function GetMuseos(props: ISlugMuseoProps) {

    // const params = useParams();

        return (
            <>
            <AddComment />
            <Messages />
            </>
        )
}