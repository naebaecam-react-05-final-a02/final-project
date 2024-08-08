export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      challengeParticipants: {
        Row: {
          challengeId: number;
          id: number;
          userId: string;
        };
        Insert: {
          challengeId: number;
          id?: number;
          userId?: string;
        };
        Update: {
          challengeId?: number;
          id?: number;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'challengeParticipants_challengeId_fkey1';
            columns: ['challengeId'];
            isOneToOne: false;
            referencedRelation: 'challenges';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'challengeParticipants_userId_fkey1';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      challengeReviews: {
        Row: {
          challengeId: number;
          content: string;
          createdAt: string | null;
          id: number;
          rating: number;
          reviewImages: string[] | null;
          title: string;
          userId: string | null;
        };
        Insert: {
          challengeId?: number;
          content: string;
          createdAt?: string | null;
          id?: number;
          rating: number;
          reviewImages?: string[] | null;
          title: string;
          userId?: string | null;
        };
        Update: {
          challengeId?: number;
          content?: string;
          createdAt?: string | null;
          id?: number;
          rating?: number;
          reviewImages?: string[] | null;
          title?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'challengeReviews_challengeId_fkey';
            columns: ['challengeId'];
            isOneToOne: true;
            referencedRelation: 'challenges';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'challengeReviews_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      challenges: {
        Row: {
          category: string;
          content: string;
          createdBy: string;
          endDate: string;
          id: number;
          imageURL: string;
          isProgress: boolean;
          participants: number;
          rating: number | null;
          startDate: string;
          tags: string | null;
          title: string;
          verify: string | null;
        };
        Insert: {
          category?: string;
          content: string;
          createdBy: string;
          endDate: string;
          id?: number;
          imageURL: string;
          isProgress?: boolean;
          participants?: number;
          rating?: number | null;
          startDate: string;
          tags?: string | null;
          title: string;
          verify?: string | null;
        };
        Update: {
          category?: string;
          content?: string;
          createdBy?: string;
          endDate?: string;
          id?: number;
          imageURL?: string;
          isProgress?: boolean;
          participants?: number;
          rating?: number | null;
          startDate?: string;
          tags?: string | null;
          title?: string;
          verify?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'challenges_createdBy_fkey';
            columns: ['createdBy'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      challengeVerify: {
        Row: {
          challengeId: number;
          date: string | null;
          id: number;
          imageURLs: Json;
          impression: string;
          userId: string;
        };
        Insert: {
          challengeId: number;
          date?: string | null;
          id?: number;
          imageURLs?: Json;
          impression: string;
          userId: string;
        };
        Update: {
          challengeId?: number;
          date?: string | null;
          id?: number;
          imageURLs?: Json;
          impression?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'challengeParticipants_challengeId_fkey';
            columns: ['challengeId'];
            isOneToOne: false;
            referencedRelation: 'challenges';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'challengeParticipants_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      diets: {
        Row: {
          createdAt: string;
          date: string;
          dietType: number;
          foods: Json[];
          id: number;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          date: string;
          dietType: number;
          foods: Json[];
          id?: number;
          userId: string;
        };
        Update: {
          createdAt?: string;
          date?: string;
          dietType?: number;
          foods?: Json[];
          id?: number;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'diet_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      exerciseRoutines: {
        Row: {
          created_at: string;
          days: number[] | null;
          endDate: string | null;
          exerciseId: number | null;
          id: number;
          userId: string | null;
        };
        Insert: {
          created_at?: string;
          days?: number[] | null;
          endDate?: string | null;
          exerciseId?: number | null;
          id?: number;
          userId?: string | null;
        };
        Update: {
          created_at?: string;
          days?: number[] | null;
          endDate?: string | null;
          exerciseId?: number | null;
          id?: number;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'exerciseRoutines_exerciseId_fkey';
            columns: ['exerciseId'];
            isOneToOne: false;
            referencedRelation: 'exercises';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'exerciseRoutines_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      exercises: {
        Row: {
          date: string;
          exerciseType: string;
          id: number;
          isCompleted: boolean;
          memo: string | null;
          name: string;
          record: Json[];
          userId: string;
        };
        Insert: {
          date: string;
          exerciseType: string;
          id?: number;
          isCompleted?: boolean;
          memo?: string | null;
          name: string;
          record: Json[];
          userId: string;
        };
        Update: {
          date?: string;
          exerciseType?: string;
          id?: number;
          isCompleted?: boolean;
          memo?: string | null;
          name?: string;
          record?: Json[];
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'exercises_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      exercisesBookmarks: {
        Row: {
          exerciseName: string;
          id: number;
          userId: string | null;
        };
        Insert: {
          exerciseName: string;
          id?: number;
          userId?: string | null;
        };
        Update: {
          exerciseName?: string;
          id?: number;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'exercisesBookmarks_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      goals: {
        Row: {
          completedDate: string | null;
          createdAt: string;
          desc: string;
          id: number;
          isCompleted: boolean;
          title: string;
          userId: string;
        };
        Insert: {
          completedDate?: string | null;
          createdAt?: string;
          desc: string;
          id?: number;
          isCompleted?: boolean;
          title: string;
          userId: string;
        };
        Update: {
          completedDate?: string | null;
          createdAt?: string;
          desc?: string;
          id?: number;
          isCompleted?: boolean;
          title?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'goals_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          createdAt: string;
          email: string;
          height: number | null;
          id: string;
          introduction: string;
          nickname: string | null;
          profileURL: string | null;
          userIndex: number;
          weight: number | null;
        };
        Insert: {
          createdAt?: string;
          email: string;
          height?: number | null;
          id: string;
          introduction?: string;
          nickname?: string | null;
          profileURL?: string | null;
          userIndex?: number;
          weight?: number | null;
        };
        Update: {
          createdAt?: string;
          email?: string;
          height?: number | null;
          id?: string;
          introduction?: string;
          nickname?: string | null;
          profileURL?: string | null;
          userIndex?: number;
          weight?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      weights: {
        Row: {
          date: string;
          id: number;
          userId: string;
          weight: number;
        };
        Insert: {
          date: string;
          id?: number;
          userId: string;
          weight: number;
        };
        Update: {
          date?: string;
          id?: number;
          userId?: string;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'weight_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
