import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLists, useRecipients, useUser } from '@/context';
import { useDispatchLists } from '@/context';
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import mixpanel from 'mixpanel-browser';
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';

import SideNav from '../components/sideNav/SideNav';
import NavMobile from '../components/navMobile/NavMobile';
import { Montserrat } from 'next/font/google';
// import PhoneForm from '../components/phoneInput/PhoneInput'

import styles from '../styles/page.module.css';
import { AccessParameter, IList, ListType } from '@/types';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function CreateList() {
  const dispatchLists = useDispatchLists();
  const recipients = useRecipients();
  const lists = useLists();

  const router = useRouter();
  const {
    id,
    listName: settingsListName,
    listType: settingsListType,
    accessParameter: settingsAccessParameter,
    keepPurchased: settingsKeepPurchased,
    recipientId: settingsRecipientId,
  } = router.query;
  const user = useUser();
  const senderId = user?.id ?? null;

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [listName, setListName] = useState<string>(
    (settingsListName as string) || ''
  );
  const [listType, setListType] = useState<ListType>(
    (settingsListType as ListType) || 'Select the type'
  );
  const [accessParameter, setAccessParameters] = useState<AccessParameter>(
    (settingsAccessParameter as AccessParameter) || 'Select access parameters'
  );
  const [recipient, setRecipient] = useState<string>(
    settingsRecipientId
      ? recipients.find((item) => item.id === settingsRecipientId)!.name
      : 'Choose recipient'
  );
  // const [description, setDescription] = useState<string>('')
  const [keepPurchased, setKeepPurchased] = useState<boolean>(
    typeof settingsKeepPurchased === 'undefined'
      ? true
      : !!Number(settingsKeepPurchased)
  );

  const hackyRegex =
    /<script|<\/script>|javascript:|<|>|onload=|onerror=|onmouseover=|onmouseout=|onfocus=|onblur=|onclick=|ondblclick=|onkeydown=|onkeypress=|onkeyup=|onsubmit=|onreset=|onselect=|onchange=|onloadstart=|onprogress=|onabort=|onloadend=|oncanplay=|oncanplaythrough=|ondurationchange=|onemptied=|onended=|onerror=|oninput=|oninvalid=|onpause=|onplay=|onplaying=|onprogress=|onratechange=|onreadystatechange=|onseeked=|onseeking=|onstalled=|onsuspend=|ontimeupdate=|onvolumechange=|onwaiting=/i;

  const nameRegex = /^[a-zA-Z]+$/;

  // useEffect(() => {
  //   const params: URLSearchParams = new URLSearchParams(window.location.search)
  //   setSearchParams(params)
  // }, [])
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  useEffect(() => {
    console.log('lists = ', lists);
  }, [lists]);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (hackyRegex.test(listName)) {
      setMessage('Invalid characters detected in list name.');
      setIsLoading(false);

      return;
    }

    if (listName.length < 3 || listName.length > 50) {
      setMessage('List name is too short');
      setIsLoading(false);

      return;
    }

    if (!nameRegex.test(listName)) {
      setMessage('List name must only contain alphabetic characters');
      setIsLoading(false);

      return;
    }

    if (
      listName === '' ||
      listType === 'Select the type' ||
      accessParameter === 'Select access parameters' ||
      recipient === 'Choose recipient'
    ) {
      setMessage(
        'List name, list type, access parameters and recipient are required.'
      );
      setIsLoading(false);

      return;
    }
    setIsLoading(true);
    setMessage(null);

    const recipientId = recipients.find((item) => item.name === recipient)?.id;
    if (!recipientId) {
      setMessage("Recipient id haven't be undefined or null");
      setIsLoading(false);
      return;
    }
    const payload: IList = {
      id: (id as unknown as string) || uuidv4(),
      listName,
      listType,
      accessParameter,
      // description,
      keepPurchased,
      recipientId,
      senderId,
      vouchers: [],
    };

    if (settingsListName) {
      dispatchLists({
        type: 'UPDATE_LIST',
        payload,
      });

      toast.success('Settings saved.', {
        position: toast.POSITION.BOTTOM_LEFT,
      });

      // fetch(`${process.env.NEXT_PUBLIC_API_RECIPIENTS_URL}/update-list`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // })
      //   .then((response: any) => {
      //     if (response.ok) {
      //       dispatchLists({
      //         type: 'UPDATE_LIST',
      //         payload,
      //       })

      //       toast.success('Settings saved.', {
      //         position: toast.POSITION.BOTTOM_LEFT,
      //       })

      //       // if (searchParams?.has('return_url')) {
      //       //   router.push(searchParams.get('return_url') ?? '/cart');
      //       // } else {
      //       router.push('/select-deal?recipientCountryCode=ZA&category=Shopping')
      //       // }
      //     }
      //   })
      //   .catch((error: unknown) => {
      //     console.log(error)
      //     setMessage('Something went wrong. Please try again later.')
      //   })
      setIsLoading(false);
      // dispatchLists({
      //   type: 'UPDATE_LIST',
      //   payload,
      // })

      router.back();
      return;
    }

    console.log(
      'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE'
    );
    // const name = event.currentTarget.name.value.trim()

    mixpanel.track('Create wishlist');

    if (false) {
      fetch(`${process.env.NEXT_PUBLIC_API_RECIPIENTS_URL}/create-list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response: any) => {
          if (response.ok) {
            dispatchLists({
              type: 'ADD_LIST',
              payload,
            });

            toast.success('List created.', {
              position: toast.POSITION.BOTTOM_LEFT,
            });

            // if (searchParams?.has('return_url')) {
            //   router.push(searchParams.get('return_url') ?? '/cart');
            // } else {
            router.push(
              '/select-deal?recipientCountryCode=ZA&category=Shopping'
            );
            // }
          }
        })
        .catch((error: unknown) => {
          setMessage('Something went wrong. Please try again later.');
        });
      setIsLoading(false);
    } else {
      try {
        dispatchLists({
          type: 'ADD_LIST',
          payload,
        });
        toast.success('List created.', {
          position: toast.POSITION.BOTTOM_LEFT,
        });

        // if (searchParams?.has('return_url')) {
        //   router.push(searchParams.get('return_url') ?? '/cart');
        // } else {
        router.push('/select-deal?recipientCountryCode=ZA&category=Shopping');
        // }
      } catch (error) {
        setMessage('Something went wrong. Please try again later.');
      }
      setIsLoading(false);
    }
  };

  console.log('settingsListName = ', settingsListName);

  console.log('recipients = ', recipients);

  return (
    <>
      {user && (
        <main className={`${montserrat.className} ${styles.main}`}>
          <NavMobile withCart={true} />

          <div className={styles.contentBody}>
            <div className={styles.navSidedBody}>
              <SideNav />
              <div>
                <div className={styles.pageHeading}>
                  {settingsListName ? 'List settings' : 'Create list'}
                </div>
                <br />
                <br />
                <form onSubmit={submitHandler} style={{ width: '300px' }}>
                  <div className={styles.formElement}>
                    <label htmlFor="name">
                      List name<span className={styles.required}>*</span>:
                    </label>
                    <TextField
                      autoComplete="off"
                      hiddenLabel
                      id="name"
                      // defaultValue=""
                      // variant="outlined"
                      name="name"
                      value={listName}
                      onChange={(e) => setListName(e.target.value.trim())}
                      required
                      style={{ width: '100%', backgroundColor: '#ffffff' }}
                    />
                  </div>
                  <div className={styles.formElement}>
                    <label htmlFor="listType">
                      List type<span className={styles.required}>*</span>:
                    </label>
                    <Select
                      aria-labelledby="listType"
                      name="listType"
                      value={listType}
                      onChange={(e) => setListType(e.target.value as ListType)}
                      required
                      style={{ width: '100%', backgroundColor: '#ffffff' }}
                    >
                      <MenuItem value="Select the type">
                        Select the type
                      </MenuItem>
                      <MenuItem value="Me">Me</MenuItem>
                      <MenuItem value="Organization">Organization</MenuItem>
                    </Select>

                    <label htmlFor="accessParameter">
                      Access parameters
                      <span className={styles.required}>*</span>:
                    </label>
                    <Select
                      sx={{ width: 300 }}
                      aria-labelledby="accessParameter"
                      name="accessParameter"
                      value={accessParameter}
                      onChange={(e) =>
                        setAccessParameters(e.target.value as AccessParameter)
                      }
                      required
                      style={{ width: '100%', backgroundColor: '#ffffff' }}
                    >
                      <MenuItem value="Select access parameters">
                        Select access parameters
                      </MenuItem>
                      <MenuItem value="View only">View only</MenuItem>
                      <MenuItem value="Can edit">Can edit</MenuItem>
                    </Select>

                    <label htmlFor="recipient">
                      Recipient<span className={styles.required}>*</span>:
                    </label>
                    <Select
                      aria-labelledby="recipient"
                      name="recipient"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      required
                      style={{ width: '100%', backgroundColor: '#ffffff' }}
                    >
                      <MenuItem value="Choose recipient">
                        Choose recipient
                      </MenuItem>
                      {recipients.map((recipient, index) => (
                        <MenuItem key={index} value={recipient.name}>
                          {recipient.name}
                        </MenuItem>
                      ))}
                    </Select>

                    {/* <label htmlFor="description">Description:</label>
                    <TextField
                      autoComplete="off"
                      hiddenLabel
                      id="description"
                      // defaultValue=""
                      // variant="outlined"
                      name="description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      // required
                      style={{ width: '100%', backgroundColor: '#ffffff' }}
                    /> */}

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={keepPurchased}
                          onChange={() => setKeepPurchased(!keepPurchased)}
                        />
                      }
                      label="Keep purchased items on this list"
                      sx={{ 'span:nth-of-type(2)': { paddingTop: '4px' } }}
                    />
                  </div>

                  {message && <p className={styles.errorMessage}>{message}</p>}

                  <div className={styles.contentFooter}>
                    <input
                      type="submit"
                      className={styles.actionButton}
                      value={settingsListName ? 'Save settings' : 'Create List'}
                      disabled={isLoading}
                    />
                  </div>
                  {isLoading && <CircularProgress size={24} color="success" />}
                </form>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
