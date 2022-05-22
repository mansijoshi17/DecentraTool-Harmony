## Decentra Tool : The Decentra Tool helps DAO manage their role based Team membership using NFTs, Payroll management, DAO Drive for document management and grant role based permissions to DAO members.

![MicrosoftTeams-image (48)](https://user-images.githubusercontent.com/105703992/168970650-d56af04d-2334-4283-8056-63ce375c2f70.png)

### The Decentra Tool is built for DAO members to help them achieve DAO Team management in the best and most decentralized manner.

## It includes:

**1) Role Management:** DAO admin can create roles as per their requirement like Content Team, Video Editing Team, Tech Team, etc. as per the role, NFT will be minted and assigned to DAO members.

![role](https://user-images.githubusercontent.com/105703992/168972033-3d5493f6-bb00-4cbd-b8c6-87c5a6079d09.png)

**2) DAO NFT Membership:** DAO admin can create role based NFT drop and send it to DAO members. By receiving role based NFT, members can log in and access only a particular area of their Dashboard as per permissions granted to their role.

![FireShot Capture 039 - Membership - Decentra Tool - localhost](https://user-images.githubusercontent.com/105703992/168971690-e823e944-5889-4e6b-9813-310da177b4c8.png)

![FireShot Capture 040 - Members - Decentra Tool - localhost](https://user-images.githubusercontent.com/105703992/168971785-d4b62e5d-b419-4aa5-aa93-2268bf00ac54.png)

**3) Payroll:** DAO members with finance role NFT as well as admin can schedule salary disbursement to DAO members using superfluid money streaming.

![FireShot Capture 010 - DAOManagmentTool - localhost](https://user-images.githubusercontent.com/69969675/162637248-a5dc324d-e950-44a0-adbd-6e920e9dbc15.png)

**4) DAO Drive:** It is a document vault for DAO where members can save important documents like invoices, legal agreements copies, and images on decentralized Web3 storage via DAO Drive.

![daodrive](https://user-images.githubusercontent.com/105703992/168972287-c18d338d-154c-497b-9f96-054f984cce7f.png)

**5) Feedback / WhistleBlower complaints:** DAO members can anonymously submit feedback and for any unethical behavior, whistleblowers can raise complaints to help DAO stay aligned with their rules and regulations and terminate the membership of bad actors.

![feedback](https://user-images.githubusercontent.com/105703992/168972418-2391d4bb-dfc3-4d9b-a6ff-34f815f16a12.png)

# Contract Addresses : Polygon

BulkMint: 0xd037aF2979AaB4B1bcef601337427C710e1cfF7f

https://mumbai.polygonscan.com/address/0xd037aF2979AaB4B1bcef601337427C710e1cfF7f

MultiSend: 0x5158542F000f3D50aA3Ef90E04beB41C80b8D862

https://mumbai.polygonscan.com/address/0x5158542F000f3D50aA3Ef90E04beB41C80b8D862

### How its made:

- Role based Membership: By this functionality Admin can create NFT(ERC721 Token) and mint membership tokens based on user's role like Admin, Data manager, Support team etc and assign the role to respective member of the DAO.
- While Adding members, Admin needs to send Role NFT to user's address by which user will be able to login and access role based dashboard as per Admin's assigned permission.
- Payroll management system of The Decentra Tool has been achieved through the use of superfluid.
- Moralis file storage has been used for permanent storage of DAO documents on DAO drive
- Graph: Subgraph query is used to fetch the outgoing payroll salary stream being distributed to DAO members.
