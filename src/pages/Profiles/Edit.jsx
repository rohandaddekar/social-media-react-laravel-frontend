import useMeUser from "@/api/users/Me";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUserUpdateProfile from "@/api/users/UpdateProfile";
import { Loader2 } from "lucide-react";
import useUserChangePassword from "@/api/users/ChangePassword";

const Edit = () => {
  const { data, error, isLoading, meUserReq } = useMeUser();
  const { isLoading: isLoadingUpdateProfile, userUpdateProfileReq } =
    useUserUpdateProfile();
  const {
    isLoading: isLoadingChangePassword,
    error: errorChangePassword,
    userChangePasswordReq,
  } = useUserChangePassword();

  const [selectedBannerImg, setSelectedBannerImg] = useState(null);
  const [selectedProfileImg, setSelectedProfileImg] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    about_me: "",
  });
  const [passwordFormData, setPasswordFormData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const inputBannerImgRef = useRef(null);
  const inputProfileImgRef = useRef(null);

  useEffect(() => {
    meUserReq();
  }, []);

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        email: data?.email || "",
        about_me: data?.about_me || "",
      }));
    }
  }, [data]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generalSubmitHandler = (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("first_name", formData?.first_name);
    formDataObj.append("last_name", formData?.last_name);
    formDataObj.append("email", formData?.email);
    formDataObj.append("about_me", formData?.about_me);
    formDataObj.append("profile_image", selectedProfileImg);
    formDataObj.append("profile_banner_image", selectedBannerImg);

    userUpdateProfileReq(formDataObj);
    console.log("formDataObj: ", formDataObj);
  };

  const changePasswordSubmitHandler = (e) => {
    e.preventDefault();
    userChangePasswordReq(passwordFormData);
    console.log("passwordFormData: ", passwordFormData);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="border p-5 rounded-md">
          <h1 className="text-2xl font-semibold border-b pb-3 mb-5">
            Edit Profile
          </h1>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="general" className="w-full">
                General
              </TabsTrigger>
              <TabsTrigger value="password" className="w-full">
                Change Password
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Failed to load</p>
              ) : (
                <form
                  onSubmit={generalSubmitHandler}
                  className="flex flex-col gap-5"
                >
                  <div className="border rounded-md p-4 flex gap-5">
                    <div className="w-2/3 border-r pr-5">
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-md font-semibold">
                          Profile Banner Image
                        </Label>
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => inputBannerImgRef.current.click()}
                        >
                          Change Image
                        </Button>

                        <input
                          type="file"
                          className="hidden"
                          ref={inputBannerImgRef}
                          onChange={(e) =>
                            setSelectedBannerImg(e.target.files[0])
                          }
                        />
                      </div>
                      <img
                        src={
                          selectedBannerImg
                            ? URL.createObjectURL(selectedBannerImg)
                            : data?.profile_banner_image
                        }
                        alt="banner image"
                        className="my-2 w-full h-40 object-cover rounded-md border"
                      />
                    </div>
                    <div className="w-1/3">
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-md font-semibold">
                          Profile Image
                        </Label>
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => inputProfileImgRef.current.click()}
                        >
                          Change Image
                        </Button>

                        <input
                          type="file"
                          className="hidden"
                          ref={inputProfileImgRef}
                          onChange={(e) =>
                            setSelectedProfileImg(e.target.files[0])
                          }
                        />
                      </div>
                      <img
                        src={
                          selectedProfileImg
                            ? URL.createObjectURL(selectedProfileImg)
                            : data?.profile_image
                        }
                        alt="banner image"
                        className="my-2 w-40 h-40 object-cover rounded-full border mx-auto"
                      />
                    </div>
                  </div>

                  <div className="flex gap-5 items-center">
                    <div className="w-1/2">
                      <Label className="text-sm">First Name *</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={formData?.first_name}
                        onChange={onChangeHandler}
                        className="mt-1"
                        // error={error?.errors?.email?.[0]}
                      />
                    </div>
                    <div className="w-1/2">
                      <Label className="text-sm">Last Name *</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={formData?.last_name}
                        onChange={onChangeHandler}
                        className="mt-1"
                        // error={error?.errors?.email?.[0]}
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <Label className="text-sm">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData?.email}
                      onChange={onChangeHandler}
                      className="mt-1"
                      disabled
                      // error={error?.errors?.email?.[0]}
                    />
                  </div>

                  <div className="w-full">
                    <Label className="text-sm">About Me</Label>
                    <Textarea
                      placeholder="write here..."
                      id="about_me"
                      name="about_me"
                      type="text"
                      value={formData?.about_me}
                      onChange={onChangeHandler}
                      className="mt-1"
                      // error={submitError?.errors?.content?.[0]}
                    />
                  </div>

                  <Button disabled={isLoadingUpdateProfile}>
                    Save
                    {isLoadingUpdateProfile && (
                      <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                    )}
                  </Button>
                </form>
              )}
            </TabsContent>
            <TabsContent value="password">
              <form
                onSubmit={changePasswordSubmitHandler}
                className="flex flex-col gap-5"
              >
                <div className="w-full">
                  <Label className="text-sm">Old Password *</Label>
                  <Input
                    id="old_password"
                    name="old_password"
                    type="password"
                    onChange={onChangeHandler}
                    className="mt-1"
                    error={errorChangePassword?.errors?.old_password?.[0]}
                  />
                </div>
                <div className="w-full">
                  <Label className="text-sm">New Password *</Label>
                  <Input
                    id="new_password"
                    name="new_password"
                    type="password"
                    onChange={onChangeHandler}
                    className="mt-1"
                    error={errorChangePassword?.errors?.new_password?.[0]}
                  />
                </div>
                <div className="w-full">
                  <Label className="text-sm">Confirm New Password *</Label>
                  <Input
                    id="new_password_confirmation"
                    name="new_password_confirmation"
                    type="password"
                    onChange={onChangeHandler}
                    className="mt-1"
                    error={
                      errorChangePassword?.errors
                        ?.new_password_confirmation?.[0]
                    }
                  />
                </div>

                <Button disabled={isLoadingChangePassword}>
                  Change Password
                  {isLoadingChangePassword && (
                    <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Edit;
