
import { Command, CommandResult } from './types';
import { fetchSocialLinks } from '@/utils/database/socialLinksService';

export const socialCommand: Command = {
  name: 'social',
  description: 'Display social media links',
  execute: (args?: string): CommandResult => {
    // Return a CommandResult with isAsync flag and an asyncResolver function
    return {
      content: 'Loading social links...',
      isError: false,
      isAsync: true,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          // Fetch social links directly from the service
          const links = await fetchSocialLinks();
          
          if (!links || links.length === 0) {
            return {
              content: "No social links available.",
              isError: false
            };
          }

          // Helper function to get icon for a social link type
          const getSocialIcon = (type: string) => {
            switch (type) {
              case 'github': return '📂';
              case 'linkedin': return '💼';
              case 'twitter': return '🐦';
              case 'email': return '📧';
              case 'website': return '🌐';
              default: return '🔗';
            }
          };

          // Helper function to get display name for a social link type
          const getSocialName = (type: string) => {
            switch (type) {
              case 'github': return 'GitHub';
              case 'linkedin': return 'LinkedIn';
              case 'twitter': return 'Twitter/X';
              case 'email': return 'Email';
              case 'website': return 'Website';
              default: return type.charAt(0).toUpperCase() + type.slice(1);
            }
          };

          // Format social links output
          const formattedLinks = links.map(link => {
            const icon = getSocialIcon(link.type);
            const name = getSocialName(link.type);
            return `${icon} <a href="${link.url}" target="_blank" rel="noopener noreferrer">${name}</a>`;
          }).join('\n');

          return {
            content: `<strong>Social Links:</strong>\n\n${formattedLinks}`,
            isError: false
          };
        } catch (error) {
          console.error('Error executing social command:', error);
          return {
            content: `Error fetching social links: ${error instanceof Error ? error.message : 'Unknown error'}`,
            isError: true
          };
        }
      }
    };
  }
};
