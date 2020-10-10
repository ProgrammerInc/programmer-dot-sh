import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { Category } from '../category/models/category.model';
import { mockCategory } from '../mocks/category.mock';
import { mockLink } from '../mocks/link.mock';
import { CreateLinkInput } from './dto/create-link.input';
import { UpdateLinkInput } from './dto/update-link.input';
import { LinkResolver } from './link.resolver';
import { LinkService } from './link.service';
import { Link } from './models/link.model';

describe('LinkResolver', () => {
  let linkResolver: LinkResolver;

  beforeEach(async () => {
    function mockLinkModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkResolver,
        LinkService,
        {
          provide: getModelToken('Link'),
          useValue: mockLinkModel,
        },
      ],
    }).compile();

    linkResolver = module.get<LinkResolver>(LinkResolver);
  });

  it('should be defined', () => {
    expect(linkResolver).toBeDefined();
  });

  describe('createLink', () => {
    it('should create a link', async () => {
      const link: CreateLinkInput = { ...mockLink };
      const result: Link = mockLink;

      jest.spyOn(linkResolver, 'createLink').mockImplementation(async () => result);

      expect(await linkResolver.createLink(link)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of links', async () => {
      const result: Link[] = [mockLink];

      jest.spyOn(linkResolver, 'findAll').mockImplementation(async () => result);

      expect(await linkResolver.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a link by id', async () => {
      const result: Link = mockLink;

      jest.spyOn(linkResolver, 'findOne').mockImplementation(async () => result);

      expect(await linkResolver.findOne('1')).toBe(result);
    });
  });

  describe('updateLink', () => {
    it('should update a link', async () => {
      const link: UpdateLinkInput = { ...mockLink };
      const result: Link = mockLink;

      jest.spyOn(linkResolver, 'updateLink').mockImplementation(async () => result);

      expect(await linkResolver.updateLink(link)).toBe(result);
    });
  });

  describe('removeLink', () => {
    it('should delete a link by id', async () => {
      jest.spyOn(linkResolver, 'removeLink').mockImplementation(async () => true);

      expect(await linkResolver.removeLink('1')).toBe(true);
    });
  });

  describe('category', () => {
    it('should return a category by link', async () => {
      const result: Category = mockCategory;

      jest.spyOn(linkResolver, 'category').mockImplementation(async () => result);

      expect(await linkResolver.category(mockLink)).toBe(result);
    });
  });
});
