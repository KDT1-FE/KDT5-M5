import { useState } from 'react';
import ImageUpload from '@/components/ui/ImageUpload';
import ProfileImage from '@/components/ui/ProfileImage';
import { userStore } from '@/store';
import Button from '@/components/ui/Button';
import { editUser } from '@/api/authApi';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '@/components/ui/SectionTitle';

export default function Info() {
  // 닉네임 옆 수정 아이콘 누르면 닉네임 수정라우터로 이동하기 위해
  const navigate = useNavigate();

  //
  const { authMe } = userStore();
  const { userInfo } = userStore();
  const [profileImage, setProfileImage] = useState(
    () => userInfo?.user.profileImg
  );
  const [isSending, setIsSending] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
  };

  // 프로필 사진 변경 통신 로직
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // 이전 타임아웃이 아직 작동중이 초기화

    if (profileImage === '') {
      toast.error('변경할 이미지를 선택해주세요.', { id: 'profileImage' });

      return;
    }

    setIsSending(true);
    toast.loading('프로필 사진 변경 중', { id: 'profileImage' });
    const res = await editUser(userInfo?.accessToken as string, {
      profileImgBase64: profileImage as string,
    });
    if (res.statusCode === 200) {
      const updatedUser = res.data as UpdatedUserResponseValue;
      toast.success(`${updatedUser.displayName}님! 새로운 사진 멋져요!😁😁`, {
        id: 'profileImage',
      });
      setIsSending(false);
      // navbar에 있는 프로필 사진도 새로운 사진으로 바꿔주기 위해
      await authMe();

      setProfileImage(updatedUser.profileImg);
      return;
    }
    const errorMessage = res.message;
    toast.error(errorMessage, { id: 'profileImage' });
    setIsSending(false);
    setProfileImage('');
  };

  return (
    <div className="container mx-auto px-20 py-4">
      <SectionTitle text="내 정보" />
      <div className="flex flex-col items-center">
        <div className="flex w-96 flex-col items-center gap-3 text-gray-700">
          <ProfileImage src={profileImage} />
          <div className="flex items-center gap-2">
            <h2 className="py-2 text-3xl font-bold">
              {userInfo?.user.displayName}
            </h2>
            <AiOutlineEdit
              size={20}
              className="cursor-pointer"
              onClick={() => {
                navigate('/myaccount/changename');
              }}
            />
          </div>

          <ImageUpload korName="변경할 이미지" onChange={handleChange} />
          <Button
            text={
              isSending ? <LoadingSpinner color="white" /> : '프로필사진 변경'
            }
            disabled={isSending}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
