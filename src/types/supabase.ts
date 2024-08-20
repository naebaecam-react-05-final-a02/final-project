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
          challengeId: number
          id: number
          userId: string
        }
        Insert: {
          challengeId: number
          id?: number
          userId?: string
        }
        Update: {
          challengeId?: number
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "challengeParticipants_challengeId_fkey1"
            columns: ["challengeId"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challengeParticipants_userId_fkey1"
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
          createdAt: string | null
          id: number
          rating: number
          reviewImages: string[] | null
          title: string
          userId: string | null
        }
        Insert: {
          challengeId?: number
          content: string
          createdAt?: string | null
          id?: number
          rating: number
          reviewImages?: string[] | null
          title: string
          userId?: string | null
        }
        Update: {
          challengeId?: number
          content?: string
          createdAt?: string | null
          id?: number
          rating?: number
          reviewImages?: string[] | null
          title?: string
          userId?: string | null
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
          category: string
          content: string
          createdBy: string
          endDate: string
          id: number
          imageURL: string
          isProgress: string
          participants: number
          rating: number | null
          startDate: string
          tags: string | null
          title: string
          verifications: number
        }
        Insert: {
          category?: string
          content: string
          createdBy: string
          endDate: string
          id?: number
          imageURL: string
          isProgress?: string
          participants?: number
          rating?: number | null
          startDate: string
          tags?: string | null
          title: string
          verifications?: number
        }
        Update: {
          category?: string
          content?: string
          createdBy?: string
          endDate?: string
          id?: number
          imageURL?: string
          isProgress?: string
          participants?: number
          rating?: number | null
          startDate?: string
          tags?: string | null
          title?: string
          verifications?: number
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
      challengeVerificationLikes: {
        Row: {
          created_at: string
          id: number
          userId: string
          verificationId: number
        }
        Insert: {
          created_at?: string
          id?: number
          userId?: string
          verificationId: number
        }
        Update: {
          created_at?: string
          id?: number
          userId?: string
          verificationId?: number
        }
        Relationships: [
          {
            foreignKeyName: "challengeVerificationLikes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challengeVerificationLikes_verificationId_fkey"
            columns: ["verificationId"]
            isOneToOne: false
            referencedRelation: "challengeVerify"
            referencedColumns: ["id"]
          },
        ]
      }
      challengeVerify: {
        Row: {
          challengeId: number
          date: string | null
          id: number
          imageURLs: Json
          impression: string
          userId: string
        }
        Insert: {
          challengeId: number
          date?: string | null
          id?: number
          imageURLs?: Json
          impression: string
          userId: string
        }
        Update: {
          challengeId?: number
          date?: string | null
          id?: number
          imageURLs?: Json
          impression?: string
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
      communityAnswer: {
        Row: {
          content: string | null
          createdAt: string
          dislikes: number | null
          id: number
          likes: number | null
          questionId: number | null
          score: number | null
          userId: string | null
        }
        Insert: {
          content?: string | null
          createdAt?: string
          dislikes?: number | null
          id?: number
          likes?: number | null
          questionId?: number | null
          score?: number | null
          userId?: string | null
        }
        Update: {
          content?: string | null
          createdAt?: string
          dislikes?: number | null
          id?: number
          likes?: number | null
          questionId?: number | null
          score?: number | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communityAnswer_questionId_fkey"
            columns: ["questionId"]
            isOneToOne: false
            referencedRelation: "communityPosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communityAnswer_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communityAnswerLikes: {
        Row: {
          answerId: number | null
          id: number
          isLike: boolean | null
          userId: string | null
        }
        Insert: {
          answerId?: number | null
          id?: number
          isLike?: boolean | null
          userId?: string | null
        }
        Update: {
          answerId?: number | null
          id?: number
          isLike?: boolean | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communityAnswerLikes_answerId_fkey"
            columns: ["answerId"]
            isOneToOne: false
            referencedRelation: "communityAnswer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communityAnswerLikes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communityComment: {
        Row: {
          content: string
          createdAt: string
          id: number
          likes: number | null
          postId: number | null
          userId: string | null
        }
        Insert: {
          content: string
          createdAt?: string
          id?: number
          likes?: number | null
          postId?: number | null
          userId?: string | null
        }
        Update: {
          content?: string
          createdAt?: string
          id?: number
          likes?: number | null
          postId?: number | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communityComment_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "communityPosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communityComment_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communityCommentLikes: {
        Row: {
          commentId: number
          created_at: string
          id: number
          userId: string
        }
        Insert: {
          commentId: number
          created_at?: string
          id?: number
          userId: string
        }
        Update: {
          commentId?: number
          created_at?: string
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "communityCommentLikes_commentId_fkey"
            columns: ["commentId"]
            isOneToOne: true
            referencedRelation: "communityComment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communityCommentLikes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communityPosts: {
        Row: {
          category: string
          content: string
          createdAt: string
          dislikes: number | null
          id: number
          likes: number | null
          score: number | null
          tags: string[] | null
          title: string
          userId: string | null
          views: number | null
        }
        Insert: {
          category: string
          content: string
          createdAt?: string
          dislikes?: number | null
          id?: number
          likes?: number | null
          score?: number | null
          tags?: string[] | null
          title: string
          userId?: string | null
          views?: number | null
        }
        Update: {
          category?: string
          content?: string
          createdAt?: string
          dislikes?: number | null
          id?: number
          likes?: number | null
          score?: number | null
          tags?: string[] | null
          title?: string
          userId?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "communityPosts_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communityPostsLikes: {
        Row: {
          created_at: string
          id: number
          isLike: boolean | null
          postId: number
          userId: string
        }
        Insert: {
          created_at?: string
          id?: number
          isLike?: boolean | null
          postId: number
          userId: string
        }
        Update: {
          created_at?: string
          id?: number
          isLike?: boolean | null
          postId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "communityPostsLikes_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "communityPosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communityPostsLikes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communityQa: {
        Row: {
          answerId: number | null
          isAccepted: boolean
          questionId: number
          questionUserId: string
        }
        Insert: {
          answerId?: number | null
          isAccepted?: boolean
          questionId?: number
          questionUserId: string
        }
        Update: {
          answerId?: number | null
          isAccepted?: boolean
          questionId?: number
          questionUserId?: string
        }
        Relationships: [
          {
            foreignKeyName: "communityQa_answerId_fkey"
            columns: ["answerId"]
            isOneToOne: false
            referencedRelation: "communityAnswer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communityQa_questionId_fkey"
            columns: ["questionId"]
            isOneToOne: false
            referencedRelation: "communityPosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communityQa_questionUserId_fkey"
            columns: ["questionUserId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communityReply: {
        Row: {
          commentId: number | null
          content: string
          createdAt: string
          id: number
          likes: number | null
          userId: string | null
        }
        Insert: {
          commentId?: number | null
          content: string
          createdAt?: string
          id?: number
          likes?: number | null
          userId?: string | null
        }
        Update: {
          commentId?: number | null
          content?: string
          createdAt?: string
          id?: number
          likes?: number | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communityReply_commentId_fkey"
            columns: ["commentId"]
            isOneToOne: false
            referencedRelation: "communityComment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communityReply_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communityReplyLikes: {
        Row: {
          createdAt: string
          id: number
          replyId: number
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          replyId: number
          userId: string
        }
        Update: {
          createdAt?: string
          id?: number
          replyId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "communityReplyLikes_replyId_fkey"
            columns: ["replyId"]
            isOneToOne: true
            referencedRelation: "communityReply"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communityReplyLikes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communityVoter: {
        Row: {
          created_at: string
          id: number
          postId: number | null
          selectedOption: string | null
          userId: string
        }
        Insert: {
          created_at?: string
          id?: number
          postId?: number | null
          selectedOption?: string | null
          userId: string
        }
        Update: {
          created_at?: string
          id?: number
          postId?: number | null
          selectedOption?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "communityVoter_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "communityPosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communityVoter_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communityVotes: {
        Row: {
          id: number
          items: Json | null
          postId: number | null
          title: string | null
        }
        Insert: {
          id?: number
          items?: Json | null
          postId?: number | null
          title?: string | null
        }
        Update: {
          id?: number
          items?: Json | null
          postId?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communityVotes_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "communityPosts"
            referencedColumns: ["id"]
          },
        ]
      }
      diets: {
        Row: {
          createdAt: string
          date: string
          dietType: number
          foods: Json[]
          id: number
          userId: string
        }
        Insert: {
          createdAt?: string
          date: string
          dietType: number
          foods: Json[]
          id?: number
          userId: string
        }
        Update: {
          createdAt?: string
          date?: string
          dietType?: number
          foods?: Json[]
          id?: number
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
      exerciseRoutines: {
        Row: {
          created_at: string
          days: number[] | null
          endDate: string | null
          exerciseId: number | null
          id: number
          userId: string | null
        }
        Insert: {
          created_at?: string
          days?: number[] | null
          endDate?: string | null
          exerciseId?: number | null
          id?: number
          userId?: string | null
        }
        Update: {
          created_at?: string
          days?: number[] | null
          endDate?: string | null
          exerciseId?: number | null
          id?: number
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exerciseRoutines_exerciseId_fkey"
            columns: ["exerciseId"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exerciseRoutines_userId_fkey"
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
          exerciseType: string
          id: number
          isCompleted: boolean
          memo: string | null
          name: string
          record: Json[]
          userId: string
        }
        Insert: {
          date: string
          exerciseType: string
          id?: number
          isCompleted?: boolean
          memo?: string | null
          name: string
          record: Json[]
          userId: string
        }
        Update: {
          date?: string
          exerciseType?: string
          id?: number
          isCompleted?: boolean
          memo?: string | null
          name?: string
          record?: Json[]
          userId?: string
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
      exercisesBookmarks: {
        Row: {
          date: string | null
          exerciseType: string | null
          id: number
          memo: string | null
          name: string
          record: Json | null
          userId: string | null
        }
        Insert: {
          date?: string | null
          exerciseType?: string | null
          id?: number
          memo?: string | null
          name: string
          record?: Json | null
          userId?: string | null
        }
        Update: {
          date?: string | null
          exerciseType?: string | null
          id?: number
          memo?: string | null
          name?: string
          record?: Json | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercisesBookmarks_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      foods: {
        Row: {
          carbohydrate: number | null
          fat: number | null
          kcal: number | null
          name: string
          protein: number | null
          serving: string | null
        }
        Insert: {
          carbohydrate?: number | null
          fat?: number | null
          kcal?: number | null
          name: string
          protein?: number | null
          serving?: string | null
        }
        Update: {
          carbohydrate?: number | null
          fat?: number | null
          kcal?: number | null
          name?: string
          protein?: number | null
          serving?: string | null
        }
        Relationships: []
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
      level: {
        Row: {
          experience: number
          level: number
        }
        Insert: {
          experience: number
          level?: number
        }
        Update: {
          experience?: number
          level?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          category: string
          createdAt: string
          id: number
          idForURL: string | null
          isRead: boolean | null
          targetUserId: string
          type: string
        }
        Insert: {
          category: string
          createdAt?: string
          id?: number
          idForURL?: string | null
          isRead?: boolean | null
          targetUserId: string
          type: string
        }
        Update: {
          category?: string
          createdAt?: string
          id?: number
          idForURL?: string | null
          isRead?: boolean | null
          targetUserId?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "alarm_targetUserId_fkey"
            columns: ["targetUserId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      postsViews: {
        Row: {
          createdAt: string
          postId: number
          userId: string
        }
        Insert: {
          createdAt?: string
          postId: number
          userId: string
        }
        Update: {
          createdAt?: string
          postId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "postsviews_postid_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "communityPosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postsviews_userid_fkey"
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
          experience: number | null
          height: number | null
          id: string
          introduction: string
          level: number | null
          nickname: string | null
          profileURL: string | null
          userIndex: number
          weight: number | null
        }
        Insert: {
          createdAt?: string
          email: string
          experience?: number | null
          height?: number | null
          id: string
          introduction?: string
          level?: number | null
          nickname?: string | null
          profileURL?: string | null
          userIndex?: number
          weight?: number | null
        }
        Update: {
          createdAt?: string
          email?: string
          experience?: number | null
          height?: number | null
          id?: string
          introduction?: string
          level?: number | null
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
          {
            foreignKeyName: "users_level_fkey"
            columns: ["level"]
            isOneToOne: false
            referencedRelation: "level"
            referencedColumns: ["level"]
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
      incrementViewCount: {
        Args: {
          p_post_id: number
          p_user_id: string
        }
        Returns: undefined
      }
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
