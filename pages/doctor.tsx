import { Input } from "@nextui-org/react";
import { Disease } from "../components/HomeUser/HomeUser";
import PatientCard from "../components/HomeUser/PatientCard";
import { Chat } from "@pushprotocol/uiweb";

export default function Doctor() {
  const disease: Disease[] = [
    {
      name: "Diesease 1",
      description: "Sample Text",
    },
    {
      name: "Diesease 2",
      description: "Sample Text",
    },
    {
      name: "Diesease 3",
      description: "Sample Text",
    },
  ];

  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto grid place-items-center min-h-screen">
        <div className="bg-white rounded-lg p-5 shadow-sm w-1/2 grid place-items-center">
          <div className="w-full h-screen">
            <h2 className="text-2xl">Doctor</h2>

            <div className="w-1/2 flex mt-8 gap-4">
              <Input placeholder="Enter address" />
              <button className="bg-[#0072f5] text-white px-4 rounded-lg">
                Search Patient
              </button>
            </div>

            <h2 className="text-xl mt-8">Patient Details</h2>

            <div className="grid grid-cols-2 gap-6 mt-8">
              {disease.map((item: Disease, index: number) => (
                <PatientCard
                  name={item.name}
                  description={item.description}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Chat
        account="0x7ffC260ef58905e9a8F462a4C9b838c21352FF90" //user address
        supportAddress="0xd9c1CCAcD4B8a745e191b62BA3fcaD87229CB26d" //support address
        apiKey="xkxLiG74pc.A3n2bD4wWFNafRerPJSx1qj2KMRnmhuoFgsxCJIOzRezxmCgmv5Xc7bqhKLRCTVQ"
        modalTitle="Help line"
        env="staging"
      />
    </div>
  );
}
