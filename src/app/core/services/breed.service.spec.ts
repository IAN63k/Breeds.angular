import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BreedService, Breed } from './breed.service';
import { environment } from '../../environments/environment';

describe('BreedService', () => {
    let service: BreedService;
    let httpMock: HttpTestingController;
    const base = environment.apiBaseUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BreedService]
        });
        service = TestBed.inject(BreedService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    // Caso: listar razas
    it('debe obtener la lista de razas (GET /breeds)', () => {
        const dummy: Breed[] = [{ id: 1, name: 'Akita' }];
        service.list().subscribe(res => expect(res).toEqual(dummy));

        const req = httpMock.expectOne(`${base}/breeds`);
        expect(req.request.method).toBe('GET');
        req.flush(dummy);
    });

    // Caso: búsqueda - Test para la búsqueda de razas
    it('debe buscar razas con query', () => {
        const dummy: Breed[] = [{ id: 242, name: 'Shiba' }];
        service.search('shiba').subscribe(res => {
            expect(res.length).toBe(1);
            expect(res[0].name).toBe('Shiba');
        });

        const req = httpMock.expectOne(
            r => r.url === `${base}/breeds/search` && r.params.get('q') === 'shiba'
        );
        req.flush(dummy);
    });


    // Caso: imagen por raza - Test para obtener la imagen de una raza
    it('debe devolver la URL de la imagen de la raza', () => {
        const mockUrl = 'https://cdn2.thedogapi.com/images/abc.jpg';
        service.imageByBreed(1).subscribe(url => expect(url).toBe(mockUrl));

        const req = httpMock.expectOne(
            r => r.url === `${base}/images/search` && r.params.get('breed_ids') === '1'
        );
        req.flush([{ url: mockUrl }]);
    });
});
