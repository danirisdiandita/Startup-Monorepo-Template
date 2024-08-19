interface Member {
  id: number;
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  team_id: number;
  team_name: string;
  role: string;
  access: string;
}

interface TeamInvitationEmailInterface {
  subject: string;
  recipient: string;
  sender: string;
  body: string;
  team_id: number;
}
