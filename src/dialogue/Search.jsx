import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Useritem from "../components/shared/Useritem";
import { useAsyncMutation } from '../hooks/hook';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../redux/api/api";
import { setIsSearch } from "../redux/reducer/misc";

function Search() {
  const { isSearch } = useSelector((state) => state.misc);
  const [sendFriendRequest,isLoadingSendFriendRequest]=useAsyncMutation(useSendFriendRequestMutation)
  const [searchUser] = useLazySearchUserQuery();
  const dispatch = useDispatch();
  const search = useInputValidation(); 
  const [users, setUsers] = useState([]);
  const [initialUsers, setInitialUsers] = useState([]);

  const addFriendHandler = async (id) => {
   await sendFriendRequest("Sending friend request",{userId:id})
    
  };
  

  const closeHandler = () => dispatch(setIsSearch(false));


  // Fetch initial user data on component mount
  useEffect(() => {
    searchUser('')
      .then(({ data }) => {
        setUsers(data.users);
        setInitialUsers(data.users); // Store initial data separately
      })
      .catch((e) => console.log(e));
  }, []);

  // Fetch user data based on search input
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (search.value) {
        searchUser(search.value)
          .then(({ data }) => setUsers(data.users))
          .catch((e) => console.log(e));
      } else {
        setUsers(initialUsers); // Reset to initial data if search input is cleared
      }
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value, searchUser, initialUsers]);

  return (
    <Dialog open={isSearch} onClose={closeHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <List>
          {users.map((user) => (
            <Useritem user={user} key={user._id} handler={addFriendHandler} handlerisLoading={isLoadingSendFriendRequest} />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
}

export default Search;
