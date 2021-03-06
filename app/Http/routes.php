<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Back-office

Route::get('keywords', 'BackOfficeController@keywords');
Route::get('texts', 'BackOfficeController@texts');

// API

Route::group(['prefix' => 'api'], function() {
	
	Route::resource('keywords', 'KeywordController', ['except' => [
	    'create', 'edit'
	]]);

	Route::resource('texts', 'TextController', ['except' => [
	    'create', 'edit'
	]]);
});
