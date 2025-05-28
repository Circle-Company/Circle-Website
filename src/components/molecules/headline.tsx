import { ActionButton } from "../atoms/actionbutton"

export function Headline() {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-50px text-primary font-bold font-sf-pro">Circle App</h1>
            <h3 className="text-20px text-primary font-regular font-sf-pro mb-2">Making the World More Human</h3>
            <h4 className="text-16px text-subHeadline font-regular font-sf-pro mb-8">Social app to create moments and share your memories...</h4>
            <ActionButton text="Download Now"/>
        </div>
    )
}