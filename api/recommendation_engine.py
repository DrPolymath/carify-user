import pandas as pd
import scipy.sparse as sp
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json


def recommendCar(selectedCar):
    # Data Extraction
    car_data = pd.read_csv('carData.csv')
    # car_data.head()

    # Data Combination
    data_recommend = car_data.drop(columns=['carBrandId', 'carBrandUrl', 'carModelId',
                                   'carModelUrl', 'carVariantId', 'carModelName', 'carVariantName', 'price', 'maleClick', 'femaleClick', 'totalClick'])
    data_recommend['combine'] = data_recommend[data_recommend.columns[0:3]].apply(
        lambda x: ','.join(x.dropna().astype(str)), axis=1)
    data_recommend = data_recommend.drop(
        columns=['carBrandName', 'bodyType', 'priceRange'])
    # data_recommend.head()

    # Data Transformation
    count = CountVectorizer(stop_words='english')
    count_matrix = count.fit_transform(data_recommend['combine'])

    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(car_data['carVariantName'])

    combine_sparse = sp.hstack([count_matrix, tfidf_matrix], format='csr')

    cosine_sim = cosine_similarity(combine_sparse, combine_sparse)

    # Recommend Car
    indices = pd.Series(car_data.index, index=car_data['carVariantName'])
    index = indices[selectedCar]

    sim_scores = list(enumerate(cosine_sim[index]))
    sim_scores = sorted(sim_scores, key=lambda x: x, reverse=True)
    sim_scores = sim_scores[1:21]

    car_indices = [i[0] for i in sim_scores]

    car_brand_id = car_data['carBrandId'].iloc[car_indices]
    car_brand_name = car_data['carBrandName'].iloc[car_indices]
    car_brand_url = car_data['carBrandUrl'].iloc[car_indices]
    car_model_id = car_data['carModelId'].iloc[car_indices]
    car_model_name = car_data['carModelName'].iloc[car_indices]
    car_model_url = car_data['carModelUrl'].iloc[car_indices]
    car_model_bodyType = car_data['bodyType'].iloc[car_indices]
    car_variant_id = car_data['carVariantId'].iloc[car_indices]
    car_variant_name = car_data['carVariantName'].iloc[car_indices]
    car_variant_price = car_data['price'].iloc[car_indices]
    car_variant_maleClick = car_data['maleClick'].iloc[car_indices]
    car_variant_femaleClick = car_data['femaleClick'].iloc[car_indices]
    car_variant_totalClick = car_data['totalClick'].iloc[car_indices]

    recommendation_data = pd.DataFrame(columns=['carBrandId', 'carBrandName', 'carBrandUrl', 'carModelId',
                                       'carModelName', 'carModelUrl', 'bodyType', 'carVariantId', 'carVariantName', 'price', 'maleClick', 'femaleClick', 'totalClick'])

    recommendation_data['carBrandId'] = car_brand_id
    recommendation_data['carBrandName'] = car_brand_name
    recommendation_data['carBrandUrl'] = car_brand_url
    recommendation_data['carModelId'] = car_model_id
    recommendation_data['carModelName'] = car_model_name
    recommendation_data['carModelUrl'] = car_model_url
    recommendation_data['bodyType'] = car_model_bodyType
    recommendation_data['carVariantId'] = car_variant_id
    recommendation_data['carVariantName'] = car_variant_name
    recommendation_data['price'] = car_variant_price
    recommendation_data['maleClick'] = car_variant_maleClick
    recommendation_data['femaleClick'] = car_variant_femaleClick
    recommendation_data['totalClick'] = car_variant_totalClick

    result = recommendation_data.to_json(orient="index")
    parsed = json.loads(result)

    return result
