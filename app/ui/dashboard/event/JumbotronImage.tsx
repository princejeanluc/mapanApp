import SearchComponent from "@/app/ui/dashboard/event/SearchComponent";


export default function JumbotronImage(){

    return <>
        <section className="flex items-center justify-center w-svw md:h-56 bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply ">
            <div className=" md:m-auto flex flex-col space-y-5">
                <div className=" px-4 mx-auto max-w-screen-xl text-center ">
                    <h1 className="block text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        Planifier , Invitez ...
                    </h1>
                </div>

            </div>
        </section>


    </>
}