import { Spin as AntSpin, Input } from 'antd';
import {
  deleteUser as deleteUserFirebase,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicButton from 'src/components/buttons/BasicButton/BasicButton';
import {
  ItemContainer,
  ItemLabel,
  TabContainer,
} from 'src/components/layouts/TabLayouts/TabLayouts';
import { NAME_UPDATED, USER_DELETED } from 'src/constants/messages';
import useAuth from 'src/hooks/useAuth';
import useNotify from 'src/hooks/useNotify';
import { deleteUser } from 'src/services/api';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();
  const { notify, notifyError } = useNotify();

  const handleUpdate = async (evt: KeyboardEvent<HTMLInputElement>) => {
    setLoading(true);
    const newName = evt.currentTarget.value;
    const clone = structuredClone(user);

    if (
      !auth.currentUser ||
      !newName ||
      newName === auth.currentUser.displayName
    ) {
      setLoading(false);
      return;
    }

    try {
      evt.currentTarget.blur();
      setUser((prev) => (prev ? { ...prev, name: newName } : null));
      await updateProfile(auth.currentUser, {
        displayName: newName,
      });
      notify(NAME_UPDATED);
    } catch (err) {
      notifyError(err);
      setUser(clone ?? null);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    if (auth.currentUser) {
      try {
        await deleteUser();
        await deleteUserFirebase(auth.currentUser);
        notify(USER_DELETED);
      } catch (err) {
        notifyError(err);
      }
    }
    navigate('/signin');
  };

  return (
    <TabContainer>
      {loading && <AntSpin fullscreen></AntSpin>}
      <ItemContainer>
        <ItemLabel>User name</ItemLabel>
        <Input
          disabled={!auth.currentUser || loading}
          defaultValue={auth.currentUser?.displayName ?? 'New user name'}
          onPressEnter={handleUpdate}
        />
      </ItemContainer>
      <ItemContainer>
        <BasicButton onClick={deleteAccount}>Delete account</BasicButton>
      </ItemContainer>
    </TabContainer>
  );
};

export default Profile;
