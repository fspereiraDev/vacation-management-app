export type User = {
	id: string;
	name: string;
	email: string; 
	phone: number | string
	position: string;
	password: string;
	role: string
}

export type VacationRequest = {
  note: string;
	id: string;
  employeeName: string;
	userId: number;
  startDate: string; 
  endDate: string;  
  status: string;
	requestedBy: string,
  approvedBy?: string;
	approvedDate: string;
}
  

export interface AuthContextType {
  user: User | null;
  login: (user: User | null) => void;
  logout: () => void;
}

export type ModalProps = {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}