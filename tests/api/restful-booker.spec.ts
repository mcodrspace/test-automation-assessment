import { test, expect, APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

const BOOKING = {
  firstname: 'John',
  lastname: 'Doe',
  totalprice: 100,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-07-10',
    checkout: '2026-07-15',
  },
  additionalneeds: 'Breakfast',
};

async function getAuthToken(request: APIRequestContext): Promise<string> {
  const response = await request.post(`${BASE_URL}/auth`, {
    data: {
      username: 'admin',
      password: 'password123',
    },
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  return body.token;
}

async function createBooking(request: APIRequestContext): Promise<number> {
  const response = await request.post(`${BASE_URL}/booking`, {
    data: BOOKING,
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  return body.bookingid;
}

test.describe('RESTful Booker API', () => {
  test('Create booking @happy', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      data: BOOKING,
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.booking.firstname).toBe(BOOKING.firstname);
    expect(body.booking.lastname).toBe(BOOKING.lastname);
    expect(body.booking.totalprice).toBe(BOOKING.totalprice);
  });

  test('Read booking @happy', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.get(
      `${BASE_URL}/booking/${bookingId}`
    );

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.firstname).toBe(BOOKING.firstname);
    expect(body.lastname).toBe(BOOKING.lastname);
  });

  test('Update booking @happy', async ({ request }) => {
    const token = await getAuthToken(request);
    const bookingId = await createBooking(request);

    const response = await request.put(
      `${BASE_URL}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
        data: {
          firstname: 'Jane',
          lastname: 'Doe',
          totalprice: 150,
          depositpaid: false,
          bookingdates: {
            checkin: '2026-07-10',
            checkout: '2026-07-20',
          },
          additionalneeds: 'Dinner',
        },
      }
    );

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.firstname).toBe('Jane');
    expect(body.totalprice).toBe(150);
    expect(body.additionalneeds).toBe('Dinner');
  });

  test('Delete booking @happy', async ({ request }) => {
    const token = await getAuthToken(request);
    const bookingId = await createBooking(request);

    const response = await request.delete(
      `${BASE_URL}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    expect(response.status()).toBe(201);

    const getResponse = await request.get(
      `${BASE_URL}/booking/${bookingId}`
    );

    expect(getResponse.status()).toBe(404);
  });

  test('Update booking with invalid authentication @unhappy', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.put(
      `${BASE_URL}/booking/${bookingId}`,
      {
        headers: {
          Cookie: 'token=invalid-token',
        },
        data: BOOKING,
      }
    );

    expect(response.status()).toBe(403);
  });
});