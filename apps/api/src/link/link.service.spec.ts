import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from 'nestjs-typegoose';
import { Category } from '../category/models/category.model';
import { mockCategory } from '../mocks/category.mock';
import { mockLink } from '../mocks/link.mock';
import { CreateLinkInput } from './dto/create-link.input';
import { UpdateLinkInput } from './dto/update-link.input';
import { LinkService } from './link.service';
import { Link } from './models/link.model';

describe('LinkService', () => {
  let linkService: LinkService;

  beforeEach(async () => {
    function mockLinkModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        {
          provide: getModelToken('Link'),
          useValue: mockLinkModel,
        },
      ],
    }).compile();

    linkService = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(linkService).toBeDefined();
  });

  describe('create', () => {
    it('should create a link', async () => {
      const link: CreateLinkInput = { ...mockLink };
      const result: Link = mockLink;

      jest.spyOn(linkService, 'create').mockImplementation(async () => result);

      expect(await linkService.create(link)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of links', async () => {
      const result: Link[] = [mockLink];

      jest.spyOn(linkService, 'findAll').mockImplementation(async () => result);

      expect(await linkService.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a link by id', async () => {
      const result: Link = mockLink;

      jest.spyOn(linkService, 'findOne').mockImplementation(async () => result);

      expect(await linkService.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a link', async () => {
      const link: UpdateLinkInput = { ...mockLink };
      const result: Link = mockLink;

      jest.spyOn(linkService, 'update').mockImplementation(async () => result);

      expect(await linkService.update(link.id, link)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a link by id', async () => {
      jest.spyOn(linkService, 'remove').mockImplementation(async () => true);

      expect(await linkService.remove('1')).toBe(true);
    });
  });

  describe('category', () => {
    it('should return a category by link id', async () => {
      const result: Category = mockCategory;

      jest.spyOn(linkService, 'category').mockImplementation(async () => result);

      expect(await linkService.category('1')).toBe(result);
    });
  });
});
