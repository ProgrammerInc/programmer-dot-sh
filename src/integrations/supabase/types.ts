export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      ai_usage_logs: {
        Row: {
          completion_tokens: number | null
          content_type: string
          created_at: string
          id: string
          prompt_tokens: number | null
          total_tokens: number | null
          user_id: string
        }
        Insert: {
          completion_tokens?: number | null
          content_type: string
          created_at?: string
          id?: string
          prompt_tokens?: number | null
          total_tokens?: number | null
          user_id: string
        }
        Update: {
          completion_tokens?: number | null
          content_type?: string
          created_at?: string
          id?: string
          prompt_tokens?: number | null
          total_tokens?: number | null
          user_id?: string
        }
        Relationships: []
      }
      animations: {
        Row: {
          animation_props: Json | null
          created_at: string | null
          description: string | null
          id: string
          identifier: string
          name: string | null
          type: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          animation_props?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          identifier: string
          name?: string | null
          type: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          animation_props?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          identifier?: string
          name?: string | null
          type?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          published_at: string | null
          score: number | null
          source: string
          tags: string[] | null
          title: string
          updated_at: string
          url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          published_at?: string | null
          score?: number | null
          source: string
          tags?: string[] | null
          title: string
          updated_at?: string
          url: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          published_at?: string | null
          score?: number | null
          source?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      background_colors: {
        Row: {
          background_id: string
          color_id: string
        }
        Insert: {
          background_id: string
          color_id: string
        }
        Update: {
          background_id?: string
          color_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "background_colors_background_id_fkey"
            columns: ["background_id"]
            isOneToOne: false
            referencedRelation: "backgrounds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "background_colors_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
        ]
      }
      backgrounds: {
        Row: {
          animation_id: string | null
          created_at: string | null
          description: string | null
          gradient_id: string | null
          id: string
          identifier: string
          image_id: string | null
          name: string | null
          style: Json | null
          type: string
          updated_at: string | null
          user_id: string | null
          video_id: string | null
        }
        Insert: {
          animation_id?: string | null
          created_at?: string | null
          description?: string | null
          gradient_id?: string | null
          id?: string
          identifier: string
          image_id?: string | null
          name?: string | null
          style?: Json | null
          type: string
          updated_at?: string | null
          user_id?: string | null
          video_id?: string | null
        }
        Update: {
          animation_id?: string | null
          created_at?: string | null
          description?: string | null
          gradient_id?: string | null
          id?: string
          identifier?: string
          image_id?: string | null
          name?: string | null
          style?: Json | null
          type?: string
          updated_at?: string | null
          user_id?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "backgrounds_animation_id_fkey"
            columns: ["animation_id"]
            isOneToOne: false
            referencedRelation: "animations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "backgrounds_gradient_id_fkey"
            columns: ["gradient_id"]
            isOneToOne: false
            referencedRelation: "gradients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "backgrounds_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "backgrounds_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_at: string | null
          reading_time_minutes: number | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          reading_time_minutes?: number | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          reading_time_minutes?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      book_bookmarks: {
        Row: {
          book_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          book_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          book_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_bookmarks_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          article_id: string | null
          created_at: string
          description: string | null
          external_url: string | null
          id: string
          source: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          article_id?: string | null
          created_at?: string
          description?: string | null
          external_url?: string | null
          id?: string
          source?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          article_id?: string | null
          created_at?: string
          description?: string | null
          external_url?: string | null
          id?: string
          source?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          audiobook_duration_minutes: number | null
          audiobook_url: string | null
          author: string
          book_type: string | null
          categories: string[] | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          isbn: string | null
          language: string | null
          narrator: string | null
          page_count: number | null
          preview_url: string | null
          publication_date: string | null
          publisher: string | null
          purchase_url: string | null
          rating: number | null
          source: string
          title: string
          trending_score: number | null
          updated_at: string
        }
        Insert: {
          audiobook_duration_minutes?: number | null
          audiobook_url?: string | null
          author: string
          book_type?: string | null
          categories?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          isbn?: string | null
          language?: string | null
          narrator?: string | null
          page_count?: number | null
          preview_url?: string | null
          publication_date?: string | null
          publisher?: string | null
          purchase_url?: string | null
          rating?: number | null
          source: string
          title: string
          trending_score?: number | null
          updated_at?: string
        }
        Update: {
          audiobook_duration_minutes?: number | null
          audiobook_url?: string | null
          author?: string
          book_type?: string | null
          categories?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          isbn?: string | null
          language?: string | null
          narrator?: string | null
          page_count?: number | null
          preview_url?: string | null
          publication_date?: string | null
          publisher?: string | null
          purchase_url?: string | null
          rating?: number | null
          source?: string
          title?: string
          trending_score?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      calendar_settings: {
        Row: {
          created_at: string
          default_view: string
          id: string
          notifications: Json | null
          timezone: string
          updated_at: string
          user_id: string
          work_days: number[]
          work_hours_end: string
          work_hours_start: string
        }
        Insert: {
          created_at?: string
          default_view?: string
          id?: string
          notifications?: Json | null
          timezone?: string
          updated_at?: string
          user_id: string
          work_days?: number[]
          work_hours_end?: string
          work_hours_start?: string
        }
        Update: {
          created_at?: string
          default_view?: string
          id?: string
          notifications?: Json | null
          timezone?: string
          updated_at?: string
          user_id?: string
          work_days?: number[]
          work_hours_end?: string
          work_hours_start?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          categories: string[] | null
          created_at: string
          credential_id: string | null
          credential_url: string | null
          description: string | null
          expiration_date: string | null
          id: string
          is_featured: boolean | null
          issue_date: string | null
          issuing_organization: string
          skills: string[] | null
          source: string
          title: string
          updated_at: string
          verification_status: string | null
        }
        Insert: {
          categories?: string[] | null
          created_at?: string
          credential_id?: string | null
          credential_url?: string | null
          description?: string | null
          expiration_date?: string | null
          id?: string
          is_featured?: boolean | null
          issue_date?: string | null
          issuing_organization: string
          skills?: string[] | null
          source: string
          title: string
          updated_at?: string
          verification_status?: string | null
        }
        Update: {
          categories?: string[] | null
          created_at?: string
          credential_id?: string | null
          credential_url?: string | null
          description?: string | null
          expiration_date?: string | null
          id?: string
          is_featured?: boolean | null
          issue_date?: string | null
          issuing_organization?: string
          skills?: string[] | null
          source?: string
          title?: string
          updated_at?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          priority: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_conversations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          attachments: Json | null
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean
          message: string
          sender_id: string | null
          sender_type: string
        }
        Insert: {
          attachments?: Json | null
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          sender_id?: string | null
          sender_type?: string
        }
        Update: {
          attachments?: Json | null
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          sender_id?: string | null
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      colors: {
        Row: {
          color: string
          created_at: string | null
          description: string | null
          id: string
          identifier: string
          name: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          color: string
          created_at?: string | null
          description?: string | null
          id?: string
          identifier: string
          name?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          color?: string
          created_at?: string | null
          description?: string | null
          id?: string
          identifier?: string
          name?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          article_id: string
          content: string
          created_at: string
          id: string
          parent_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          article_id: string
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          article_id?: string
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: Json | null
          billing_email: string | null
          created_at: string
          description: string | null
          id: string
          industry: string | null
          is_active: boolean
          logo_url: string | null
          name: string
          settings: Json | null
          size_category: string | null
          slug: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: Json | null
          billing_email?: string | null
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean
          logo_url?: string | null
          name: string
          settings?: Json | null
          size_category?: string | null
          slug: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: Json | null
          billing_email?: string | null
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean
          logo_url?: string | null
          name?: string
          settings?: Json | null
          size_category?: string | null
          slug?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      company_members: {
        Row: {
          company_id: string
          created_at: string
          department: string | null
          id: string
          invited_by: string | null
          is_active: boolean
          joined_at: string
          role: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          department?: string | null
          id?: string
          invited_by?: string | null
          is_active?: boolean
          joined_at?: string
          role?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          department?: string | null
          id?: string
          invited_by?: string | null
          is_active?: boolean
          joined_at?: string
          role?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      course_bookmarks: {
        Row: {
          course_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_bookmarks_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          categories: string[] | null
          course_url: string | null
          created_at: string
          currency: string | null
          description: string | null
          discount_percentage: number | null
          duration_hours: number | null
          enrollment_count: number | null
          has_certificate: boolean | null
          id: string
          image_url: string | null
          instructor: string | null
          is_free: boolean | null
          language: string | null
          last_updated: string | null
          level: string | null
          original_price: number | null
          price: number | null
          provider: string
          rating: number | null
          rating_count: number | null
          requirements: string[] | null
          skills: string[] | null
          source: string
          title: string
          updated_at: string
          what_you_learn: string[] | null
        }
        Insert: {
          categories?: string[] | null
          course_url?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          discount_percentage?: number | null
          duration_hours?: number | null
          enrollment_count?: number | null
          has_certificate?: boolean | null
          id?: string
          image_url?: string | null
          instructor?: string | null
          is_free?: boolean | null
          language?: string | null
          last_updated?: string | null
          level?: string | null
          original_price?: number | null
          price?: number | null
          provider: string
          rating?: number | null
          rating_count?: number | null
          requirements?: string[] | null
          skills?: string[] | null
          source: string
          title: string
          updated_at?: string
          what_you_learn?: string[] | null
        }
        Update: {
          categories?: string[] | null
          course_url?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          discount_percentage?: number | null
          duration_hours?: number | null
          enrollment_count?: number | null
          has_certificate?: boolean | null
          id?: string
          image_url?: string | null
          instructor?: string | null
          is_free?: boolean | null
          language?: string | null
          last_updated?: string | null
          level?: string | null
          original_price?: number | null
          price?: number | null
          provider?: string
          rating?: number | null
          rating_count?: number | null
          requirements?: string[] | null
          skills?: string[] | null
          source?: string
          title?: string
          updated_at?: string
          what_you_learn?: string[] | null
        }
        Relationships: []
      }
      cursor_animations: {
        Row: {
          animation_type: string
          created_at: string | null
          description: string | null
          id: string
          identifier: string
          name: string | null
          props: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          animation_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          identifier: string
          name?: string | null
          props?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          animation_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          identifier?: string
          name?: string | null
          props?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cursors: {
        Row: {
          animation_id: string | null
          created_at: string | null
          description: string | null
          enabled: boolean | null
          id: string
          identifier: string
          name: string
          style: Json | null
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          animation_id?: string | null
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          identifier: string
          name: string
          style?: Json | null
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          animation_id?: string | null
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          identifier?: string
          name?: string
          style?: Json | null
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cursors_animation_id_fkey"
            columns: ["animation_id"]
            isOneToOne: false
            referencedRelation: "cursor_animations"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_project_requests: {
        Row: {
          admin_notes: string | null
          attachments: Json | null
          created_at: string | null
          description: string | null
          id: string
          priority: string | null
          project_id: string | null
          request_type: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          attachments?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          request_type?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          attachments?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          request_type?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      degree_programs: {
        Row: {
          accreditation: string | null
          admission_requirements: string[] | null
          application_deadline: string | null
          application_url: string | null
          career_outcomes: string[] | null
          categories: string[] | null
          created_at: string
          currency: string | null
          curriculum_highlights: string[] | null
          degree_type: string
          delivery_format: string | null
          description: string | null
          duration_months: number | null
          field_of_study: string | null
          id: string
          institution: string
          is_featured: boolean | null
          program_url: string | null
          source: string
          start_dates: string[] | null
          title: string
          tuition_cost: number | null
          updated_at: string
        }
        Insert: {
          accreditation?: string | null
          admission_requirements?: string[] | null
          application_deadline?: string | null
          application_url?: string | null
          career_outcomes?: string[] | null
          categories?: string[] | null
          created_at?: string
          currency?: string | null
          curriculum_highlights?: string[] | null
          degree_type: string
          delivery_format?: string | null
          description?: string | null
          duration_months?: number | null
          field_of_study?: string | null
          id?: string
          institution: string
          is_featured?: boolean | null
          program_url?: string | null
          source: string
          start_dates?: string[] | null
          title: string
          tuition_cost?: number | null
          updated_at?: string
        }
        Update: {
          accreditation?: string | null
          admission_requirements?: string[] | null
          application_deadline?: string | null
          application_url?: string | null
          career_outcomes?: string[] | null
          categories?: string[] | null
          created_at?: string
          currency?: string | null
          curriculum_highlights?: string[] | null
          degree_type?: string
          delivery_format?: string | null
          description?: string | null
          duration_months?: number | null
          field_of_study?: string | null
          id?: string
          institution?: string
          is_featured?: boolean | null
          program_url?: string | null
          source?: string
          start_dates?: string[] | null
          title?: string
          tuition_cost?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          category: string
          company_id: string | null
          description: string | null
          file_path: string
          file_size: number
          file_type: string
          id: string
          is_public: boolean
          name: string
          tags: string[] | null
          uploaded_at: string
          user_id: string
        }
        Insert: {
          category?: string
          company_id?: string | null
          description?: string | null
          file_path: string
          file_size: number
          file_type: string
          id?: string
          is_public?: boolean
          name: string
          tags?: string[] | null
          uploaded_at?: string
          user_id: string
        }
        Update: {
          category?: string
          company_id?: string | null
          description?: string | null
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          is_public?: boolean
          name?: string
          tags?: string[] | null
          uploaded_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      education: {
        Row: {
          created_at: string
          degree: string
          details: string | null
          duration: string
          id: string
          institution: string
        }
        Insert: {
          created_at?: string
          degree: string
          details?: string | null
          duration: string
          id?: string
          institution: string
        }
        Update: {
          created_at?: string
          degree?: string
          details?: string | null
          duration?: string
          id?: string
          institution?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          event_type: string
          event_url: string | null
          id: string
          image_url: string | null
          is_free: boolean | null
          location: string | null
          max_attendees: number | null
          organizer: string | null
          source: string
          start_date: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_type: string
          event_url?: string | null
          id?: string
          image_url?: string | null
          is_free?: boolean | null
          location?: string | null
          max_attendees?: number | null
          organizer?: string | null
          source: string
          start_date: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_type?: string
          event_url?: string | null
          id?: string
          image_url?: string | null
          is_free?: boolean | null
          location?: string | null
          max_attendees?: number | null
          organizer?: string | null
          source?: string
          start_date?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      experience_achievements: {
        Row: {
          created_at: string
          description: string
          experience_id: string | null
          id: string
        }
        Insert: {
          created_at?: string
          description: string
          experience_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          description?: string
          experience_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_achievements_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_technologies: {
        Row: {
          created_at: string
          experience_id: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          experience_id?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          experience_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_technologies_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          company: string
          created_at: string
          description: string
          duration: string
          id: string
          location: string
          position: string
        }
        Insert: {
          company: string
          created_at?: string
          description: string
          duration: string
          id?: string
          location: string
          position: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          duration?: string
          id?: string
          location?: string
          position?: string
        }
        Relationships: []
      }
      gradients: {
        Row: {
          alpha: number | null
          created_at: string | null
          description: string | null
          gradient: string | null
          id: string
          identifier: string
          name: string | null
          style: Json | null
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          alpha?: number | null
          created_at?: string | null
          description?: string | null
          gradient?: string | null
          id?: string
          identifier: string
          name?: string | null
          style?: Json | null
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          alpha?: number | null
          created_at?: string | null
          description?: string | null
          gradient?: string | null
          id?: string
          identifier?: string
          name?: string | null
          style?: Json | null
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      images: {
        Row: {
          aspect_ratio: string | null
          created_at: string | null
          description: string | null
          height: number | null
          id: string
          identifier: string
          mime_type: string
          name: string | null
          orientation: string | null
          source: Json | null
          source_type: string | null
          storage_type: string | null
          type: string
          updated_at: string | null
          url: string | null
          user_id: string | null
          width: number | null
        }
        Insert: {
          aspect_ratio?: string | null
          created_at?: string | null
          description?: string | null
          height?: number | null
          id?: string
          identifier: string
          mime_type: string
          name?: string | null
          orientation?: string | null
          source?: Json | null
          source_type?: string | null
          storage_type?: string | null
          type: string
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
          width?: number | null
        }
        Update: {
          aspect_ratio?: string | null
          created_at?: string | null
          description?: string | null
          height?: number | null
          id?: string
          identifier?: string
          mime_type?: string
          name?: string | null
          orientation?: string | null
          source?: Json | null
          source_type?: string | null
          storage_type?: string | null
          type?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
          width?: number | null
        }
        Relationships: []
      }
      invitations: {
        Row: {
          accepted_at: string | null
          company_id: string
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by: string
          role: string
          status: string
          team_id: string | null
        }
        Insert: {
          accepted_at?: string | null
          company_id: string
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          invited_by: string
          role?: string
          status?: string
          team_id?: string | null
        }
        Update: {
          accepted_at?: string | null
          company_id?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          role?: string
          status?: string
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invitations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          client_email: string
          client_name: string
          company_id: string | null
          created_at: string
          currency: string
          description: string | null
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          line_items: Json | null
          notes: string | null
          payment_terms: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          client_email: string
          client_name: string
          company_id?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          due_date: string
          id?: string
          invoice_number: string
          issue_date?: string
          line_items?: Json | null
          notes?: string | null
          payment_terms?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          client_email?: string
          client_name?: string
          company_id?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          line_items?: Json | null
          notes?: string | null
          payment_terms?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      job_bookmarks: {
        Row: {
          created_at: string
          id: string
          job_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_bookmarks_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company: string
          created_at: string
          currency: string | null
          description: string | null
          experience_level: string | null
          expires_at: string | null
          id: string
          job_type: string | null
          location: string | null
          published_at: string | null
          remote: boolean | null
          salary_max: number | null
          salary_min: number | null
          skills: string[] | null
          source: string
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          company: string
          created_at?: string
          currency?: string | null
          description?: string | null
          experience_level?: string | null
          expires_at?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          published_at?: string | null
          remote?: boolean | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: string[] | null
          source: string
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          company?: string
          created_at?: string
          currency?: string | null
          description?: string | null
          experience_level?: string | null
          expires_at?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          published_at?: string | null
          remote?: boolean | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: string[] | null
          source?: string
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      meeting_attendees: {
        Row: {
          created_at: string
          id: string
          is_organizer: boolean
          meeting_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_organizer?: boolean
          meeting_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_organizer?: boolean
          meeting_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_attendees_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      meetings: {
        Row: {
          agenda: string | null
          attachments: Json | null
          attendees: Json | null
          company_id: string | null
          created_at: string
          description: string | null
          end_time: string
          id: string
          is_recurring: boolean
          location: string | null
          meeting_type: string
          meeting_url: string | null
          notes: string | null
          organizer_id: string
          priority: string
          project_id: string | null
          recurrence_pattern: Json | null
          start_time: string
          status: string
          team_id: string | null
          timezone: string
          title: string
          updated_at: string
        }
        Insert: {
          agenda?: string | null
          attachments?: Json | null
          attendees?: Json | null
          company_id?: string | null
          created_at?: string
          description?: string | null
          end_time: string
          id?: string
          is_recurring?: boolean
          location?: string | null
          meeting_type?: string
          meeting_url?: string | null
          notes?: string | null
          organizer_id: string
          priority?: string
          project_id?: string | null
          recurrence_pattern?: Json | null
          start_time: string
          status?: string
          team_id?: string | null
          timezone?: string
          title: string
          updated_at?: string
        }
        Update: {
          agenda?: string | null
          attachments?: Json | null
          attendees?: Json | null
          company_id?: string | null
          created_at?: string
          description?: string | null
          end_time?: string
          id?: string
          is_recurring?: boolean
          location?: string | null
          meeting_type?: string
          meeting_url?: string | null
          notes?: string | null
          organizer_id?: string
          priority?: string
          project_id?: string | null
          recurrence_pattern?: Json | null
          start_time?: string
          status?: string
          team_id?: string | null
          timezone?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meetings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_management"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
          status: string
          subscribed_at: string
          unsubscribed_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          recipient_email: string
          resend_id: string | null
          status: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          recipient_email: string
          resend_id?: string | null
          status?: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          recipient_email?: string
          resend_id?: string | null
          status?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notification_templates: {
        Row: {
          body: string
          channel: string[]
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          slug: string
          subject: string
          type: string
          updated_at: string
          variables: string[] | null
        }
        Insert: {
          body: string
          channel?: string[]
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          subject: string
          type?: string
          updated_at?: string
          variables?: string[] | null
        }
        Update: {
          body?: string
          channel?: string[]
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          subject?: string
          type?: string
          updated_at?: string
          variables?: string[] | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          company_id: string | null
          created_at: string
          data: Json | null
          expires_at: string | null
          id: string
          is_read: boolean
          message: string
          priority: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_read?: boolean
          message: string
          priority?: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_read?: boolean
          message?: string
          priority?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_profile: {
        Row: {
          bitbucket: string | null
          bluesky: string | null
          cashapp: string | null
          company: string | null
          created_at: string
          discord: string | null
          email: string
          facebook: string | null
          full_name: string | null
          github: string | null
          gitlab: string | null
          id: string
          linkedin: string | null
          location: string
          loliapp: string | null
          name: string
          patreon: string | null
          paypal: string | null
          phone: string | null
          pinterest: string | null
          reddit: string | null
          summary: string
          threads: string | null
          tiktok: string | null
          title: string
          twitter: string | null
          venmo: string | null
          website: string | null
          youtube: string | null
        }
        Insert: {
          bitbucket?: string | null
          bluesky?: string | null
          cashapp?: string | null
          company?: string | null
          created_at?: string
          discord?: string | null
          email: string
          facebook?: string | null
          full_name?: string | null
          github?: string | null
          gitlab?: string | null
          id?: string
          linkedin?: string | null
          location: string
          loliapp?: string | null
          name: string
          patreon?: string | null
          paypal?: string | null
          phone?: string | null
          pinterest?: string | null
          reddit?: string | null
          summary: string
          threads?: string | null
          tiktok?: string | null
          title: string
          twitter?: string | null
          venmo?: string | null
          website?: string | null
          youtube?: string | null
        }
        Update: {
          bitbucket?: string | null
          bluesky?: string | null
          cashapp?: string | null
          company?: string | null
          created_at?: string
          discord?: string | null
          email?: string
          facebook?: string | null
          full_name?: string | null
          github?: string | null
          gitlab?: string | null
          id?: string
          linkedin?: string | null
          location?: string
          loliapp?: string | null
          name?: string
          patreon?: string | null
          paypal?: string | null
          phone?: string | null
          pinterest?: string | null
          reddit?: string | null
          summary?: string
          threads?: string | null
          tiktok?: string | null
          title?: string
          twitter?: string | null
          venmo?: string | null
          website?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          category: string
          client_name: string | null
          completion_date: string | null
          created_at: string
          description: string
          id: string
          image_url: string | null
          is_featured: boolean | null
          project_url: string | null
          sort_order: number | null
          technologies: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          client_name?: string | null
          completion_date?: string | null
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          project_url?: string | null
          sort_order?: number | null
          technologies?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          client_name?: string | null
          completion_date?: string | null
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          project_url?: string | null
          sort_order?: number | null
          technologies?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          category: string
          company_id: string | null
          created_at: string
          description: string
          id: string
          image_url: string
          link: string
          search_text: unknown
          title: string
          user_id: string | null
        }
        Insert: {
          category: string
          company_id?: string | null
          created_at?: string
          description: string
          id?: string
          image_url?: string
          link: string
          search_text?: unknown
          title: string
          user_id?: string | null
        }
        Update: {
          category?: string
          company_id?: string | null
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          link?: string
          search_text?: unknown
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      press_releases: {
        Row: {
          category: string | null
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          pdf_url: string | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          pdf_url?: string | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          pdf_url?: string | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          email_notifications: boolean | null
          full_name: string | null
          id: string
          job_title: string | null
          language: string | null
          location: string | null
          marketing_emails: boolean | null
          phone: string | null
          push_notifications: boolean | null
          theme_preference: string | null
          timezone: string | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email_notifications?: boolean | null
          full_name?: string | null
          id: string
          job_title?: string | null
          language?: string | null
          location?: string | null
          marketing_emails?: boolean | null
          phone?: string | null
          push_notifications?: boolean | null
          theme_preference?: string | null
          timezone?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email_notifications?: boolean | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          language?: string | null
          location?: string | null
          marketing_emails?: boolean | null
          phone?: string | null
          push_notifications?: boolean | null
          theme_preference?: string | null
          timezone?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      project_files: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          name: string
          project_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name: string
          project_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name?: string
          project_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      project_highlights: {
        Row: {
          created_at: string
          description: string
          id: string
          project_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          project_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_highlights_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_management: {
        Row: {
          budget: number | null
          company_id: string | null
          created_at: string
          currency: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          priority: string
          progress: number
          start_date: string | null
          status: string
          team_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          budget?: number | null
          company_id?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          priority?: string
          progress?: number
          start_date?: string | null
          status?: string
          team_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          budget?: number | null
          company_id?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          priority?: string
          progress?: number
          start_date?: string | null
          status?: string
          team_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_management_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_management_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      project_messages: {
        Row: {
          attachments: Json | null
          created_at: string | null
          id: string
          is_internal: boolean | null
          is_read: boolean | null
          message: string
          project_id: string
          sender_id: string
        }
        Insert: {
          attachments?: Json | null
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          is_read?: boolean | null
          message: string
          project_id: string
          sender_id: string
        }
        Update: {
          attachments?: Json | null
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          is_read?: boolean | null
          message?: string
          project_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      project_milestones: {
        Row: {
          company_id: string | null
          created_at: string
          description: string | null
          due_date: string
          id: string
          priority: string
          progress: number
          project_id: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          priority?: string
          progress?: number
          project_id: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          priority?: string
          progress?: number
          project_id?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string
          project_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          project_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          project_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_management"
            referencedColumns: ["id"]
          },
        ]
      }
      project_technologies: {
        Row: {
          created_at: string
          id: string
          name: string
          project_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          project_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_technologies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string
          github_url: string | null
          id: string
          image: string | null
          is_published: boolean | null
          project_key: string
          title: string
          url: string | null
        }
        Insert: {
          created_at?: string
          description: string
          github_url?: string | null
          id?: string
          image?: string | null
          is_published?: boolean | null
          project_key: string
          title: string
          url?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          github_url?: string | null
          id?: string
          image?: string | null
          is_published?: boolean | null
          project_key?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      qrcode_presets: {
        Row: {
          created_at: string | null
          cross_origin: string | null
          description: string | null
          enabled: boolean | null
          excavate: boolean | null
          height: number
          id: string
          identifier: string
          logo_padding: number | null
          logo_padding_style: string | null
          name: string
          opacity: number | null
          quiet_zone: number | null
          remove_qrcode_behind_logo: boolean | null
          src: string
          updated_at: string | null
          width: number
          x: number | null
          y: number | null
        }
        Insert: {
          created_at?: string | null
          cross_origin?: string | null
          description?: string | null
          enabled?: boolean | null
          excavate?: boolean | null
          height: number
          id?: string
          identifier: string
          logo_padding?: number | null
          logo_padding_style?: string | null
          name: string
          opacity?: number | null
          quiet_zone?: number | null
          remove_qrcode_behind_logo?: boolean | null
          src: string
          updated_at?: string | null
          width: number
          x?: number | null
          y?: number | null
        }
        Update: {
          created_at?: string | null
          cross_origin?: string | null
          description?: string | null
          enabled?: boolean | null
          excavate?: boolean | null
          height?: number
          id?: string
          identifier?: string
          logo_padding?: number | null
          logo_padding_style?: string | null
          name?: string
          opacity?: number | null
          quiet_zone?: number | null
          remove_qrcode_behind_logo?: boolean | null
          src?: string
          updated_at?: string | null
          width?: number
          x?: number | null
          y?: number | null
        }
        Relationships: []
      }
      receipts: {
        Row: {
          amount: number
          company_id: string | null
          created_at: string
          currency: string
          id: string
          invoice_id: string | null
          notes: string | null
          payment_date: string
          payment_method: string
          receipt_number: string
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          company_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date?: string
          payment_method: string
          receipt_number: string
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          company_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date?: string
          payment_method?: string
          receipt_number?: string
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "receipts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receipts_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string
          created_at: string
          description: string
          features: string[]
          id: string
          is_active: boolean
          name: string
          sort_order: number | null
          starting_price: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          features?: string[]
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number | null
          starting_price: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          features?: string[]
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number | null
          starting_price?: string
          updated_at?: string
        }
        Relationships: []
      }
      skill_details: {
        Row: {
          created_at: string | null
          id: string
          level: string | null
          name: string
          skill_category_id: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          level?: string | null
          name: string
          skill_category_id?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          level?: string | null
          name?: string
          skill_category_id?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_details_skill_category_id_fkey"
            columns: ["skill_category_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_items: {
        Row: {
          created_at: string
          id: string
          name: string
          skill_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          skill_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_items_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string
          created_at: string
          id: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      social_media_bookmarks: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_media_bookmarks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_media_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      social_media_posts: {
        Row: {
          author_avatar_url: string | null
          author_display_name: string | null
          author_username: string
          comments_count: number | null
          content: string
          created_at: string
          engagement_score: number | null
          hashtags: string[] | null
          id: string
          likes_count: number | null
          mentions: string[] | null
          platform: string
          post_id: string
          post_url: string
          posted_at: string
          scraped_at: string
          shares_count: number | null
          updated_at: string
        }
        Insert: {
          author_avatar_url?: string | null
          author_display_name?: string | null
          author_username: string
          comments_count?: number | null
          content: string
          created_at?: string
          engagement_score?: number | null
          hashtags?: string[] | null
          id?: string
          likes_count?: number | null
          mentions?: string[] | null
          platform: string
          post_id: string
          post_url: string
          posted_at: string
          scraped_at?: string
          shares_count?: number | null
          updated_at?: string
        }
        Update: {
          author_avatar_url?: string | null
          author_display_name?: string | null
          author_username?: string
          comments_count?: number | null
          content?: string
          created_at?: string
          engagement_score?: number | null
          hashtags?: string[] | null
          id?: string
          likes_count?: number | null
          mentions?: string[] | null
          platform?: string
          post_id?: string
          post_url?: string
          posted_at?: string
          scraped_at?: string
          shares_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string
          company_id: string | null
          created_at: string
          description: string
          id: string
          priority: string
          resolved_at: string | null
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          category?: string
          company_id?: string | null
          created_at?: string
          description: string
          id?: string
          priority?: string
          resolved_at?: string | null
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          category?: string
          company_id?: string | null
          created_at?: string
          description?: string
          id?: string
          priority?: string
          resolved_at?: string | null
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          joined_at: string
          role: string
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          joined_at?: string
          role?: string
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          joined_at?: string
          role?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          color: string | null
          company_id: string
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          company_id: string
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          company_id?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          client_company: string | null
          client_name: string
          client_position: string | null
          content: string
          created_at: string
          id: string
          is_featured: boolean | null
          project_id: string | null
          rating: number | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          client_company?: string | null
          client_name: string
          client_position?: string | null
          content: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          project_id?: string | null
          rating?: number | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          client_company?: string | null
          client_name?: string
          client_position?: string | null
          content?: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          project_id?: string | null
          rating?: number | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "portfolio_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_context: {
        Row: {
          created_at: string
          current_company_id: string | null
          current_team_id: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_company_id?: string | null
          current_team_id?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_company_id?: string | null
          current_team_id?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_context_current_company_id_fkey"
            columns: ["current_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_context_current_team_id_fkey"
            columns: ["current_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      user_feeds: {
        Row: {
          created_at: string
          description: string | null
          folder: string | null
          id: string
          is_active: boolean
          last_fetched: string | null
          tags: string[] | null
          title: string
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          folder?: string | null
          id?: string
          is_active?: boolean
          last_fetched?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          folder?: string | null
          id?: string
          is_active?: boolean
          last_fetched?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          notifications_enabled: boolean | null
          sources: string[] | null
          topics: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notifications_enabled?: boolean | null
          sources?: string[] | null
          topics?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notifications_enabled?: boolean | null
          sources?: string[] | null
          topics?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          preferred_topics: string[] | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          preferred_topics?: string[] | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          preferred_topics?: string[] | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          articles_per_page: number | null
          auto_play_videos: boolean | null
          created_at: string
          email_notifications: boolean | null
          id: string
          language: string | null
          profile_visibility: string | null
          push_notifications: boolean | null
          show_read_articles: boolean | null
          theme: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          articles_per_page?: number | null
          auto_play_videos?: boolean | null
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          profile_visibility?: string | null
          push_notifications?: boolean | null
          show_read_articles?: boolean | null
          theme?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          articles_per_page?: number | null
          auto_play_videos?: boolean | null
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          profile_visibility?: string | null
          push_notifications?: boolean | null
          show_read_articles?: boolean | null
          theme?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          aspect_ratio: string | null
          created_at: string | null
          description: string | null
          height: number | null
          id: string
          identifier: string
          mime_type: string
          name: string | null
          orientation: string | null
          source: Json | null
          source_type: string | null
          storage_type: string | null
          type: string
          updated_at: string | null
          url: string | null
          user_id: string | null
          width: number | null
        }
        Insert: {
          aspect_ratio?: string | null
          created_at?: string | null
          description?: string | null
          height?: number | null
          id?: string
          identifier: string
          mime_type: string
          name?: string | null
          orientation?: string | null
          source?: Json | null
          source_type?: string | null
          storage_type?: string | null
          type: string
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
          width?: number | null
        }
        Update: {
          aspect_ratio?: string | null
          created_at?: string | null
          description?: string | null
          height?: number | null
          id?: string
          identifier?: string
          mime_type?: string
          name?: string | null
          orientation?: string | null
          source?: Json | null
          source_type?: string | null
          storage_type?: string | null
          type?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
          width?: number | null
        }
        Relationships: []
      }
      votes: {
        Row: {
          article_id: string
          created_at: string
          id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          article_id: string
          created_at?: string
          id?: string
          user_id: string
          vote_type: string
        }
        Update: {
          article_id?: string
          created_at?: string
          id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallpapers: {
        Row: {
          background_id: string
          created_at: string | null
          description: string | null
          enabled: boolean | null
          id: string
          identifier: string
          name: string | null
          theme: string | null
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          background_id: string
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          identifier: string
          name?: string | null
          theme?: string | null
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          background_id?: string
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          identifier?: string
          name?: string | null
          theme?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallpapers_background_id_fkey"
            columns: ["background_id"]
            isOneToOne: false
            referencedRelation: "backgrounds"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_company_teams: {
        Args: { company_uuid: string; user_uuid: string }
        Returns: {
          team_color: string
          team_description: string
          team_id: string
          team_name: string
          user_role: string
        }[]
      }
      get_user_companies: {
        Args: { user_uuid: string }
        Returns: {
          company_id: string
          company_name: string
          company_slug: string
          is_active: boolean
          role: string
        }[]
      }
      get_user_profile_with_roles: {
        Args: { _user_id: string }
        Returns: {
          avatar_url: string
          bio: string
          company: string
          created_at: string
          email_notifications: boolean
          full_name: string
          job_title: string
          language: string
          location: string
          marketing_emails: boolean
          phone: string
          profile_id: string
          push_notifications: boolean
          role_level: number
          roles: Json
          theme_preference: string
          timezone: string
          updated_at: string
          user_id: string
          username: string
          website: string
        }[]
      }
      get_user_role_level: { Args: { _user_id: string }; Returns: number }
      has_company_role: {
        Args: { _company_id: string; _roles: string[]; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_company_member: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
      is_meeting_attendee: {
        Args: { _meeting_id: string; _user_id: string }
        Returns: boolean
      }
      is_meeting_organizer: {
        Args: { _meeting_id: string; _user_id: string }
        Returns: boolean
      }
      user_can_access_meeting: {
        Args: { _meeting_id: string; _user_id: string }
        Returns: boolean
      }
      user_is_company_admin: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
      user_is_company_member: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "manager" | "employee" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin", "manager", "employee", "client"],
    },
  },
} as const
