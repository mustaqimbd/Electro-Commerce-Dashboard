import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import config from "@/config/config";
import { getProfile } from "@/lib/getAccessToken";

const AccountsPage = async () => {
  const user = await getProfile();

  return (
    <div className="flex-1 space-y-7">
      <div className="ring-1 p-5 ring-gray-200 rounded-md w-full">
        <div className="grid grid-cols-10">
          <div className="col-span-1">
            <Avatar className="rounded-full w-20 h-20">
              <AvatarImage
                src={`${config?.base_url}/${user?.profilePicture}`}
              />
              <AvatarFallback>{user?.fullName}</AvatarFallback>
            </Avatar>
          </div>
          <div className="col-span-9">
            <p className="font-semibold text-xl">{user?.fullName}</p>
            <p className="capitalize text-gray-500">{user?.role}</p>
            <p className="capitalize text-gray-500">{user?.uid}</p>
          </div>
        </div>
      </div>
      <div className="ring-1 p-5 ring-gray-200 rounded-md w-full">
        <h2 className="font-semibold text-lg">Personal information</h2>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <p className="text-gray-500">Full name:</p>
            <p className="text-gray-600 font-semibold capitalize">
              {user?.fullName}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Mobile:</p>
            <p className="text-gray-600 font-semibold">{user?.phoneNumber}</p>
          </div>
          <div>
            <p className="text-gray-500">Email:</p>
            <p className="text-gray-600 font-semibold">{user?.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Birth certificate No:</p>
            <p className="text-gray-600 font-semibold">
              {user?.birthCertificateNo || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">NID:</p>
            <p className="text-gray-600 font-semibold">
              {user?.NIDNo || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Emergency contact:</p>
            <p className="text-gray-600 font-semibold">
              {user?.emergencyContact || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Joining Date:</p>
            <p className="text-gray-600 font-semibold">{user?.joiningDate}</p>
          </div>
          <div>
            <p className="text-gray-500">Full address:</p>
            <p className="text-gray-600 font-semibold">
              {user?.address?.fullAddress || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
