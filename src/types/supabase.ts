export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challengeParticipants: {
        Row: {
          certificateURL: string
          challengeId: string
          id: string
          isCompleted: boolean
          userId: string
        }
        Insert: {
          certificateURL: string
          challengeId: string
          id?: string
          isCompleted?: boolean
          userId: string
        }
        Update: {
          certificateURL?: string
          challengeId?: string
          id?: string
          isCompleted?: boolean
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "challengeParticipants_challengeId_fkey"
            columns: ["challengeId"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challengeParticipants_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          createdBy: string
          desc: string
          endDate: string | null
          id: string
          isProgress: boolean
          startDate: string
          title: string
        }
        Insert: {
          createdBy: string
          desc: string
          endDate?: string | null
          id?: string
          isProgress?: boolean
          startDate?: string
          title: string
        }
        Update: {
          createdBy?: string
          desc?: string
          endDate?: string | null
          id?: string
          isProgress?: boolean
          startDate?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenges_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      diet: {
        Row: {
          carbohydrate: number
          date: string
          dietType: string
          fat: number
          foodName: string
          id: string
          kcal: number
          protein: number
          userId: string
        }
        Insert: {
          carbohydrate?: number
          date?: string
          dietType: string
          fat?: number
          foodName: string
          id?: string
          kcal?: number
          protein?: number
          userId: string
        }
        Update: {
          carbohydrate?: number
          date?: string
          dietType?: string
          fat?: number
          foodName?: string
          id?: string
          kcal?: number
          protein?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "diet_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          date: string
          distance: number | null
          duration: number
          exeriseType: string
          id: string
          repPerSets: number | null
          resistance: number | null
          sets: number | null
          userId: string
          weight: number | null
        }
        Insert: {
          date?: string
          distance?: number | null
          duration: number
          exeriseType: string
          id?: string
          repPerSets?: number | null
          resistance?: number | null
          sets?: number | null
          userId: string
          weight?: number | null
        }
        Update: {
          date?: string
          distance?: number | null
          duration?: number
          exeriseType?: string
          id?: string
          repPerSets?: number | null
          resistance?: number | null
          sets?: number | null
          userId?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "exercises_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          completedDate: string | null
          createdAt: string
          desc: string
          id: string
          isCompleted: boolean
          title: string
          userId: string
        }
        Insert: {
          completedDate?: string | null
          createdAt?: string
          desc: string
          id?: string
          isCompleted?: boolean
          title: string
          userId: string
        }
        Update: {
          completedDate?: string | null
          createdAt?: string
          desc?: string
          id?: string
          isCompleted?: boolean
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          createdAt: string
          email: string
          height: number
          id: string
          nickname: string
          profileURL: string | null
          userIndex: number
          weight: number
        }
        Insert: {
          createdAt?: string
          email: string
          height: number
          id: string
          nickname: string
          profileURL?: string | null
          userIndex?: number
          weight: number
        }
        Update: {
          createdAt?: string
          email?: string
          height?: number
          id?: string
          nickname?: string
          profileURL?: string | null
          userIndex?: number
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      weight: {
        Row: {
          date: string
          id: string
          userId: string
          weight: number
        }
        Insert: {
          date?: string
          id?: string
          userId: string
          weight?: number
        }
        Update: {
          date?: string
          id?: string
          userId?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "weight_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
