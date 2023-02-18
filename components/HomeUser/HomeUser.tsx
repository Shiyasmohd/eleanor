import PatientCard from "./PatientCard"

export type Disease = {
    name: string,
    description: string
}

export default function HomeUser(){

    const disease: Disease[] = [
        {
            name: "Diesease 1",
            description: "Sample Text"
        },
        {
            name: "Diesease 2",
            description: "Sample Text"
        },
        {
            name: "Diesease 3",
            description: "Sample Text"
        },
    ]

    return(
        <div className="w-full h-screen">
            <h2 className="text-2xl">
                Patient - Previous Records
            </h2>

            <div className="grid grid-cols-2 gap-6 mt-8">
                {
                    disease.map((item: Disease, index: number)=>(
                        <PatientCard
                            name={item.name}
                            description={item.description}
                            key={index}
                        />
                    ))
                }
            </div>

        </div>
    )
}