import { Navbar, Link, Text, Avatar, Dropdown } from "@nextui-org/react";
import { Layout } from "./Layout";
import Logo from '../../public/logo.png'
import Image from "next/image";
import { useAccount } from "wagmi";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import UserImg from '../../public/user.png'
import { useRouter } from "next/router";

type MainLayoutProps = {
  children: React.ReactNode
}

const MainNavbar = ({children}: MainLayoutProps) =>{

    const { address } = useAccount()
    const { openConnectModal } = useConnectModal();
    const router = useRouter()
    
    const collapseItems = [
        "Home",
        "Create Event",
        "Event History",
        "Log Out",
    ];
    const { openAccountModal } = useAccountModal();

    return(
        <Layout >
      <Navbar isBordered variant="sticky" className={router.asPath=='/login' ? "hidden" : ""}>
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
            <Image src={Logo} width={100} onClick={openConnectModal} alt="" />
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="default"
          hideIn="xs"
          variant="highlight-rounded"
        >
          <Navbar.Link isActive={router.asPath=="/"} onClick={()=>router.push('/')} >
            Home
          </Navbar.Link>
          <Navbar.Link isActive={router.asPath=="/create"} onClick={()=>router.push('/create')} >
            Create Event
          </Navbar.Link>
          <Navbar.Link isActive={router.asPath=="/history"} onClick={()=>router.push('/history')} >
            Events History
          </Navbar.Link>
          <Navbar.Link isActive={router.asPath=="/my-qr"} onClick={()=>router.push('/my-qr')} >
            My QR
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Dropdown placement="bottom-right" >
            <Navbar.Item >
              <Dropdown.Trigger >
                <Image
                  className="cursor-pointer"
                  color="primary"
                  src={UserImg}
                  alt=""
                  width={30}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="primary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {address?.slice(0,8)}...{address?.slice(-8,)}
                </Text>
              </Dropdown.Item>
                <Dropdown.Item key="logout" withDivider color="error" >
                    <div onClick={openAccountModal}>
                        Log Out
                    </div>
                </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>
            <Navbar.CollapseItem activeColor="primary" isActive={router.asPath=="/"} onClick={()=>router.push('/')}
            >
                Home
            </Navbar.CollapseItem>
            <Navbar.CollapseItem activeColor="primary" isActive={router.asPath=="/create"} onClick={()=>router.push('/create')}
            >
                Create Event
            </Navbar.CollapseItem>
            <Navbar.CollapseItem  activeColor="primary" isActive={router.asPath=="/history"} onClick={()=>router.push('/history')}
            >
                Event History
            </Navbar.CollapseItem>
            <Navbar.CollapseItem  activeColor="primary" isActive={router.asPath=="/my-qr"} onClick={()=>router.push('/my-qr')}
            >
                My QR
            </Navbar.CollapseItem>
            <Navbar.CollapseItem  activeColor="primary" onClick={openAccountModal}
              css={{
                color: "$error",
              }}
            >
                Log Out
            </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </Layout>
    )
}

export default MainNavbar