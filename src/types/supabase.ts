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
          challengeId: number
          content: string
          id: string
          userId: string
        }
        Insert: {
          certificateURL: string
          challengeId?: number
          content: string
          id?: string
          userId: string
        }
        Update: {
          certificateURL?: string
          challengeId?: number
          content?: string
          id?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "challengeParticipants_challengeId_fkey"
            columns: ["challengeId"]
            isOneToOne: true
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
      challengeReviews: {
        Row: {
          challengeId: number
          content: string
          createdAt: string
          id: number
          rating: number
          userId: string
        }
        Insert: {
          challengeId?: number
          content: string
          createdAt?: string
          id?: number
          rating: number
          userId: string
        }
        Update: {
          challengeId?: number
          content?: string
          createdAt?: string
          id?: number
          rating?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "challengeReviews_challengeId_fkey"
            columns: ["challengeId"]
            isOneToOne: true
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challengeReviews_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          certify: string
          content: string
          createdBy: string
          endDate: string
          id: number
          imageURL: string
          isProgress: boolean
          rating: number | null
          startDate: string
          tags: string | null
          title: string
        }
        Insert: {
          certify: string
          content: string
          createdBy: string
          endDate: string
          id?: number
          imageURL: string
          isProgress?: boolean
          rating?: number | null
          startDate: string
          tags?: string | null
          title: string
        }
        Update: {
          certify?: string
          content?: string
          createdBy?: string
          endDate?: string
          id?: number
          imageURL?: string
          isProgress?: boolean
          rating?: number | null
          startDate?: string
          tags?: string | null
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
      diets: {
        Row: {
          carbohydrate: number
          date: string
          dietType: string
          fat: number
          foodName: string[]
          id: number
          images: string[] | null
          kcal: number
          protein: number
          userId: string
        }
        Insert: {
          carbohydrate?: number
          date?: string
          dietType: string
          fat?: number
          foodName: string[]
          id?: number
          images?: string[] | null
          kcal?: number
          protein?: number
          userId: string
        }
        Update: {
          carbohydrate?: number
          date?: string
          dietType?: string
          fat?: number
          foodName?: string[]
          id?: number
          images?: string[] | null
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
      emailVerification: {
        Row: {
          code: string
          email: string
          id: number
        }
        Insert: {
          code: string
          email: string
          id?: number
        }
        Update: {
          code?: string
          email?: string
          id?: number
        }
        Relationships: []
      }
      exercises: {
        Row: {
          date: string
          distance: number | null
          duration: number
          exeriseType: string
          id: number
          repPerSets: number | null
          resistance: number | null
          sets: number | null
          todayImageURL: string
          userId: string
          weight: number | null
        }
        Insert: {
          date?: string
          distance?: number | null
          duration: number
          exeriseType: string
          id?: number
          repPerSets?: number | null
          resistance?: number | null
          sets?: number | null
          todayImageURL: string
          userId: string
          weight?: number | null
        }
        Update: {
          date?: string
          distance?: number | null
          duration?: number
          exeriseType?: string
          id?: number
          repPerSets?: number | null
          resistance?: number | null
          sets?: number | null
          todayImageURL?: string
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
          id: number
          isCompleted: boolean
          title: string
          userId: string
        }
        Insert: {
          completedDate?: string | null
          createdAt?: string
          desc: string
          id?: number
          isCompleted?: boolean
          title: string
          userId: string
        }
        Update: {
          completedDate?: string | null
          createdAt?: string
          desc?: string
          id?: number
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
          height: number | null
          id: string
          nickname: string | null
          profileURL: string | null
          userIndex: number
          weight: number | null
        }
        Insert: {
          createdAt?: string
          email: string
          height?: number | null
          id: string
          nickname?: string | null
          profileURL?: string | null
          userIndex?: number
          weight?: number | null
        }
        Update: {
          createdAt?: string
          email?: string
          height?: number | null
          id?: string
          nickname?: string | null
          profileURL?: string | null
          userIndex?: number
          weight?: number | null
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
      weights: {
        Row: {
          date: string
          id: number
          userId: string
          weight: number
        }
        Insert: {
          date: string
          id?: number
          userId: string
          weight: number
        }
        Update: {
          date?: string
          id?: number
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
