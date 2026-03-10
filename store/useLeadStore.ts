import { create } from "zustand"
import { Lead, LeadStatus } from "@/types/lead"

interface LeadState {
  leads: Lead[]
  setLeads: (leads: Lead[]) => void
  updateLeadStatus: (leadId: string, status: LeadStatus) => void
  addLead: (lead: Lead) => void
}

export const useLeadStore = create<LeadState>((set) => ({
  leads: [],
  setLeads: (leads) => set({ leads }),
  updateLeadStatus: (leadId, status) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === leadId ? { ...lead, status } : lead
      ),
    })),
  addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),
}))
