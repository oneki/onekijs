import { usePost } from 'onekijs';
import React from 'react';
import { UserType } from '../__server__/dto/user';

const CreateUserPage: React.FC = () => {
  const [submit] = usePost<UserType>('/users', {
    onSuccess: (data) => {
      window.alert(`User created successfully! id: ${data.id}, name: ${data.name}, first name: ${data.firstname}`);
    },
    onError: (error) => {
      window.alert(`An error occured while adding the product to the cart: ${error.code} ${error.message}`);
    },
  });
  return (
    <div>
      <button
        onClick={() =>
          submit({
            name: 'Collins',
            firstname: 'Max',
          })
        }
      >
        Create User
      </button>
    </div>
  );
};

export default CreateUserPage;
