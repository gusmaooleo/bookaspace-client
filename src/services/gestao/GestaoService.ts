import { Audit } from "@/utils/interfaces/Audit";
import { format } from "date-fns";
import environments from "@/config/environments";
import Cookies from "js-cookie";
import axios from "axios";

class GestaoService {
  private baseUrl: string = environments.url;

  async getAudits(): Promise<Audit[] | any> {
    try {
      const response = await axios.get<Audit[]>(`${this.baseUrl}/audit/logs`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      const formattedAudits = response.data.map((audit) => ({
        ...audit,
        timestamp: format(new Date(audit.timestamp), "dd/MM/yyyy 'às' HH:mm"),
      }));

      return formattedAudits;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  private getToken(): string {
    const token = Cookies.get("user_token");
    if (!token) {
      throw new Error("No token found");
    }
    return token;
  }
}
export default new GestaoService();
